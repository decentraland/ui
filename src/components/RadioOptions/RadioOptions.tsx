import React, { useCallback } from 'react'
import classNames from 'classnames'
import { Radio } from '../Radio/Radio'
import { InfoTooltip } from '../InfoTooltip'
import { RadioOptionsProps } from './RadioOptions.types'
import './RadioOptions.css'

export const RadioOptions = <T extends string | number | undefined>(
  props: RadioOptionsProps<T>
) => {
  const { onChange, value, options, className } = props

  const handleChange = useCallback(
    (_evt, { value }) => {
      return onChange(value)
    },
    [onChange]
  )
  return (
    <div className={classNames('dui-radio-options', className)}>
      {options.map((option) => (
        <Radio
          type="radio"
          key={option.value}
          onChange={handleChange}
          label={
            <label className="dui-radio-options__label">
              {option.name}
              {option.info ? <InfoTooltip content={option.info} /> : null}
            </label>
          }
          value={option.value}
          checked={option.value === value}
        />
      ))}
    </div>
  )
}
