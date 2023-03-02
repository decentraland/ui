import classNames from 'classnames'
import React from 'react'
import { Field } from '../Field/Field'
import './RangeField.css'

export type RangeFieldProps = {
  rangeLimitMin?: number
  rangeLimitMax?: number
  value?: [number | string | undefined, number | string | undefined] | []
  minLabel?: string
  maxLabel?: string
  className?: string
  minProps?: Partial<Field['props']>
  maxProps?: Partial<Field['props']>
  onChange: (
    value: [string, string],
    evt: React.ChangeEvent<HTMLInputElement>
  ) => void
  onBlur?: () => void
}

export const RangeField = ({
  rangeLimitMin = 0,
  rangeLimitMax = 100,
  value = [],
  minLabel = 'MIN',
  maxLabel = 'MAX',
  className,
  minProps,
  maxProps,
  onChange,
  onBlur
}: RangeFieldProps): JSX.Element => {
  const [min, max] = value

  function handleMinChange(evt) {
    const newValue = evt.target.value
    onChange([newValue, String(max)], evt)
  }

  function handleMaxChange(evt) {
    const newValue = evt.target.value
    onChange([String(min), newValue], evt)
  }

  return (
    <div className={classNames('ui min-max-field', className)}>
      <Field
        {...minProps}
        label={minLabel}
        kind="full"
        fitContent
        type="number"
        value={min}
        min={rangeLimitMin}
        max={rangeLimitMax}
        onChange={handleMinChange}
        onBlur={onBlur}
      />
      <Field
        {...maxProps}
        label={maxLabel}
        kind="full"
        fitContent
        type="number"
        value={max}
        min={rangeLimitMin}
        max={rangeLimitMax}
        onChange={handleMaxChange}
        onBlur={onBlur}
      />
    </div>
  )
}
