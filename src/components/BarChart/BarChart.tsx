import * as React from 'react'
import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import classNames from 'classnames'
import {
  BarChart as RechartBartChart,
  Bar,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { RangeField } from '../RangeField'
import { SliderField } from '../SliderField/SliderField'
import { Mana } from '../Mana/Mana'
import { Loader } from '../Loader/Loader'
import {
  ACTIVE_BAR_COLOR,
  getBarChartRanges,
  getFlooredFixed,
  getDatasetBounds,
  HOVERED_BAR_COLOR,
  inverseScale,
  isValuesInCurrentRange,
  LOADING_BAR_COLOR,
  NON_ACTIVE_BAR_COLOR,
  numberFormatter,
  CHART_LOG_SCALE,
  roundRange,
  roundNumber,
  fixedNumber
} from './utils'
import { BarChartProps, BarChartSource } from './BarChart.types'
import { BarChartTooltip } from './BarChartTooltip'
import './BarChart.css'

const DEFAULT_SLIDER_STEP = 0.1

type Range = {
  amount: number
  values: number[]
}

export const BarChart = ({
  height = 150,
  width = '100%',
  data,
  upperBound,
  loading,
  onChange,
  min,
  max,
  minLabel,
  maxLabel,
  isMana = false,
  network = Network.ETHEREUM,
  sliderStep = DEFAULT_SLIDER_STEP,
  errorMessage,
  rangeDecimals = 2,
  id = 'bar-chart'
}: BarChartProps) => {
  const [value, setValue] = useState<[string, string]>([min, max])
  const [ranges, setRanges] = useState<Range[]>()
  const [activeBar, setActiveBar] = useState<number>()
  const [rangeMax, setRangeMax] = useState<number>()
  const [rangeMin, setRangeMin] = useState<number>()
  const timeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => setValue([min, max]), [min, max])

  // clear the timeout if needed
  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
    }
  }, [])

  useEffect(() => {
    if (data) {
      try {
        const formattedValues = Object.keys(data).map((key) => Number(key))
        const maxValueFromDataset = Math.max(...formattedValues)
        const maxValue = upperBound
          ? upperBound < maxValueFromDataset
            ? upperBound
            : maxValueFromDataset
          : maxValueFromDataset
        const minValue = Math.min(...formattedValues)
        setRangeMax(maxValue)
        setRangeMin(minValue)
        setRanges(
          getBarChartRanges(data, minValue, maxValue, upperBound, rangeDecimals)
        )
      } catch (error) {
        console.error('error: ', error)
      }
    }
  }, [data, upperBound])

  const inputMaxRangeValue = useMemo(
    () => (rangeMax !== undefined ? inverseScale(rangeMax) : undefined),
    [rangeMax]
  )

  const inputMinRangeValue = useMemo(
    () => (rangeMin !== undefined ? inverseScale(rangeMin) : undefined),
    [rangeMin]
  )

  const valueFromForRangeInput = useMemo(() => {
    const scaledValue = value[0]
      ? inverseScale(Number(value[0]))
      : Number(inputMinRangeValue)

    // value lower than input min
    if (scaledValue < inputMinRangeValue) {
      return inputMinRangeValue
    }

    // value higher or equal value max
    if (scaledValue > inputMaxRangeValue) {
      return inputMaxRangeValue
    }
    return scaledValue
  }, [inputMinRangeValue, value, inputMaxRangeValue])

  const valueToForRangeInput = useMemo(() => {
    const scaledValue = value[1]
      ? inverseScale(Number(value[1]))
      : Number(inputMaxRangeValue)
    // value higher than input max
    if (scaledValue > inputMaxRangeValue) {
      return inputMaxRangeValue
    }

    // value lower or equal than current min value in range
    if (scaledValue < valueFromForRangeInput) {
      return valueFromForRangeInput
    }

    return scaledValue
  }, [inputMaxRangeValue, value, inputMinRangeValue, valueFromForRangeInput])

  const showMaxError = useMemo(
    () => value[0] && value[1] && Number(value[1]) <= Number(value[0]),
    [value]
  )

  // Slider variables to display
  const sliderMinLabel = useMemo(() => {
    const min = value[0] ? Number(value[0]) : rangeMin ? rangeMin : ''
    return numberFormatter.format(Number(min))
  }, [rangeMin, value])

  const sliderMaxLabel = useMemo(() => {
    if (data) {
      const { max: datasetMax } = getDatasetBounds(data)
      const currentMax = Number(value[1] || rangeMax)
      const isInputAtMaxValue = currentMax === rangeMax
      return `${numberFormatter.format(Number(currentMax))}${
        isInputAtMaxValue && upperBound && upperBound < datasetMax ? '+' : ''
      }`
    }
  }, [data, rangeMax, upperBound, value])

  // Component handlers
  const handleChange = useCallback(
    (
      newValue: [string, string],
      _: React.ChangeEvent | null,
      source?: BarChartSource
    ) => {
      const from = fixedNumber(newValue[0], rangeDecimals)
      const to = fixedNumber(newValue[1], rangeDecimals)
      setValue([from, to])
      if (timeout.current) {
        clearTimeout(timeout.current)
      }

      timeout.current = setTimeout(
        () => onChange([from, to], source ? source : 'input'),
        500
      ) as unknown as NodeJS.Timeout
    },
    [setValue, onChange]
  )

  const handleRangeChange = useCallback(
    (_, [min, max]) => {
      if (
        rangeMax !== undefined &&
        rangeMin !== undefined &&
        inputMaxRangeValue
      ) {
        // it can happend that the slider doesn't go all the way to the max because there's no room for other step.
        // So we compare the diff to the input step. If it's lower, we programmatically move it to the max
        const remainingToMax = inputMaxRangeValue - max
        const isTheMaxValue =
          getFlooredFixed(max, 1) ===
            getFlooredFixed(Number(inputMaxRangeValue), 1) ||
          remainingToMax <= sliderStep

        const formattedMin = Math.pow(CHART_LOG_SCALE, min)
        const formattedMax = isTheMaxValue
          ? rangeMax
          : Math.pow(CHART_LOG_SCALE, max)

        const newValue: [string, string] = [
          roundNumber(formattedMin, rangeDecimals).toString(),
          roundNumber(formattedMax, rangeDecimals).toString()
        ]
        setValue(newValue)
        handleChange(newValue, null, 'slider')
      }
    },
    [handleChange, inputMaxRangeValue, rangeMax, rangeMin, sliderStep]
  )

  // Bar chart handlers
  const handleBarChartMouseMove = useCallback((e) => {
    setActiveBar(e.activeTooltipIndex)
  }, [])

  const handleBarChartMouseLeave = useCallback(() => {
    setActiveBar(undefined)
  }, [])

  const handleBarChartClick = useCallback(
    ({ activePayload }) => {
      const values = activePayload[0].payload.values
      const isUpperBoundRange = values[0] === values[1]

      handleChange(
        isUpperBoundRange
          ? [values[0].toString(), '']
          : roundRange(activePayload[0].payload.values),
        null,
        'chart'
      )
    },
    [handleChange]
  )

  const renderBarCell = useCallback(
    (entry: Range, index: number) => {
      const isActiveRange = isValuesInCurrentRange(
        entry.values,
        Number(value[0] || rangeMin),
        Number(value[1] || rangeMax)
      )
      return (
        <Cell
          key={`cell-${index}`}
          fill={
            activeBar === index
              ? HOVERED_BAR_COLOR
              : loading
              ? LOADING_BAR_COLOR
              : isActiveRange
              ? ACTIVE_BAR_COLOR
              : NON_ACTIVE_BAR_COLOR
          }
        />
      )
    },
    [activeBar, loading, rangeMax, rangeMin, value]
  )

  // disables the behavior of chanhing value while scrolling on top of the input
  const onRangeWheel = useCallback((e) => {
    // Prevent the input value change
    e.target.blur()
    // Prevent the page/container scrolling
    e.stopPropagation()
    timeout.current = setTimeout(() => {
      e.target.focus()
    }, 0) as unknown as NodeJS.Timeout
  }, [])

  const handleBlur = useCallback(() => {
    if (Number.parseFloat(value[0]) > Number.parseFloat(value[1])) {
      const swappedRange: [string, string] = [value[1], value[0]]
      setValue(swappedRange)
      onChange(swappedRange, 'input')
    }
  }, [onChange, setValue, value])

  function getLabel(value: string) {
    return isMana ? (
      <Mana network={network} className="slider-label">
        {value}
      </Mana>
    ) : (
      <span className="slider-label">{value}</span>
    )
  }

  return (
    <div className="bar-chart">
      <RangeField
        minLabel={minLabel}
        maxLabel={maxLabel}
        id={`${id}-range-field`}
        minProps={{
          icon: isMana ? <Mana network={network} /> : null,
          iconPosition: 'left',
          placeholder: 0,
          onWheel: onRangeWheel
        }}
        maxProps={{
          icon: isMana ? <Mana network={network} /> : null,
          iconPosition: 'left',
          placeholder: 1000,
          onWheel: onRangeWheel
        }}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />

      {loading ? (
        <div
          className={classNames(
            'loader-container',
            !data && 'no-data-loading-layer'
          )}
        >
          <div className="loading-layer" />
          <Loader active />
        </div>
      ) : null}

      {!!data && !!ranges && !!inputMaxRangeValue && (
        <>
          <ResponsiveContainer width={width} height={height}>
            <RechartBartChart
              data={ranges}
              margin={{ top: 20, right: 12, left: 12 }}
              onMouseMove={handleBarChartMouseMove}
              onMouseLeave={handleBarChartMouseLeave}
              onClick={handleBarChartClick}
            >
              <Tooltip
                cursor={false}
                content={<BarChartTooltip network={network} isMana={isMana} />}
                position={{ y: 25 }}
              />
              <Bar dataKey="amount" barSize={8}>
                {ranges?.map(renderBarCell)}
              </Bar>
            </RechartBartChart>
          </ResponsiveContainer>

          <SliderField
            header=""
            range
            valueFrom={valueFromForRangeInput}
            valueTo={valueToForRangeInput}
            min={inputMinRangeValue}
            max={inputMaxRangeValue}
            step={sliderStep}
            onChange={handleRangeChange}
            labelFrom={getLabel(sliderMinLabel)}
            labelTo={getLabel(sliderMaxLabel)}
          />
          {errorMessage && showMaxError ? (
            <span className="bar-chart-error">{errorMessage}</span>
          ) : null}
        </>
      )}
    </div>
  )
}
