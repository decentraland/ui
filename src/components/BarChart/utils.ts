export const HOVERED_BAR_COLOR = 'pink'
export const LOADING_BAR_COLOR = 'grey'
export const ACTIVE_BAR_COLOR = '#ff2d55'
export const NON_ACTIVE_BAR_COLOR = '#4f1414'
export const CHART_LOG_SCALE = 5
const CHART_BAR_QTY = 24

export const numberFormatter = Intl.NumberFormat('en', {
  notation: 'compact'
} as Intl.NumberFormatOptions)

export const formatAndRoundNumberString = (number: string) => {
  return numberFormatter.format(Number(number))
}

export const roundRange = (range: number[]): [string, string] => {
  return [roundNumber(range[0]).toString(), roundNumber(range[1]).toString()]
}

const formatNumber = (number: string) => roundNumber(Number(number))

export const inverseScale = (number: number) => {
  // avoid doing Math.log(0) which would return Inifity
  return number !== 0 ? Math.log(number) / Math.log(CHART_LOG_SCALE) : 0
}

export const roundNumber = (number: number, decimals = 2) => {
  let exp = 1
  if (number < 10) {
    return Number(number.toFixed(decimals))
  }
  if (number > 100) exp = 100
  if (number > 1000) exp = 1000
  return Math.round(number / exp) * exp
}

export const fixedNumber = (value: string, decimals: number): string => {
  const regex = new RegExp(`^([0-9]+((.|,)?([0-9]?){${decimals}})?)`, 'g')
  const match = value.match(regex)
  return match ? match[0] : ''
}

export const createExponentialRange = (
  min: number,
  max: number,
  upperBound?: number,
  decimals?: number
) => {
  const rangeMin = inverseScale(min)
  const rangeMax = inverseScale(max)
  const step = (rangeMax - rangeMin) / CHART_BAR_QTY
  const arr: number[] = []
  for (let i = 0; i < CHART_BAR_QTY; i++) {
    const prev = arr[i - 1]
    arr.push(prev !== undefined ? prev + step : rangeMin)
  }

  return [
    ...arr.map((interval) =>
      interval !== 0
        ? roundNumber(Math.pow(CHART_LOG_SCALE, interval), decimals)
        : interval
    ),
    ...(upperBound && max > upperBound ? [upperBound] : [])
  ]
}

export const getBarChartRanges = (
  data: Record<string, number>,
  min: number,
  max: number,
  upperBound?: number,
  rangeDecimals?: number
) => {
  const ranges = createExponentialRange(min, max, upperBound, rangeDecimals)
  const bars = ranges.reduce((acc, range) => {
    acc.set(range, 0)
    return acc
  }, new Map())
  try {
    // iterates each data entry of <number, ocurrences>
    Object.entries(data).forEach(([key, value]) => {
      const formattedNumber = formatNumber(key)
      const upperBoundIdx = ranges.findIndex(
        (range) => formattedNumber <= range
      )
      let upperBound =
        ranges[upperBoundIdx > 0 ? upperBoundIdx - 1 : upperBoundIdx]
      if (upperBound === undefined) {
        upperBound = ranges[ranges.length - 1]
      }
      const currentValueForRange = bars.get(upperBound) || 0
      bars.set(upperBound, currentValueForRange + value)
    })

    const final = []
    const mapIterator = bars.entries()
    let interval: [string, number] = mapIterator.next().value
    while (interval) {
      const [maxOfInterval, amount] = interval
      const nextInterval = mapIterator.next().value
      final.push({
        values: [
          Number(maxOfInterval),
          nextInterval ? Number(nextInterval[0]) : Number(maxOfInterval)
        ],
        amount
      })
      interval = nextInterval
    }

    return final
  } catch (error) {
    throw Error('Error generating bar chart')
  }
}

export const isValuesInCurrentRange = (
  range: number[],
  min: number,
  max: number
) => {
  return (
    (range[0] >= min || range[1] > min) && (range[0] < max || range[1] <= max)
  )
}

export const formatValueToLocale = (
  value: [string, string]
): [string, string] => {
  const formattedMin = Number(value[0]).toLocaleString()
  const formattedMax = Number(value[1]).toLocaleString()
  return [formattedMin, formattedMax]
}

export const getFlooredFixed = (v: number, d: number) => {
  return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d)
}

export const getDatasetBounds = (data: Record<string, number>) => {
  const formattedData = Object.keys(data).map((key) => Number(key))
  return {
    min: Math.min(...formattedData),
    max: Math.max(...formattedData)
  }
}
