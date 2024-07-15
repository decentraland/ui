import React from 'react'
import classNames from 'classnames'
import { Header } from '../Header/Header'
import { ArrayFilterProps } from './ArrayFilter.types'
import './ArrayFilter.css'

const getNewValues = (value: string, values: string[]) => {
  return values.some((x) => x === value)
    ? values.filter((x) => x !== value)
    : [...values, value]
}

const ArrayFilter = (props: ArrayFilterProps) => {
  const { className, name, values, options, onChange } = props

  const handleKeyDown =
    (option: string) => (evt: React.KeyboardEvent<HTMLDivElement>) => {
      if (evt.key === 'Enter') {
        onChange(getNewValues(option, values))
      }
    }

  const handleOnClick = (option: string) => () => {
    onChange(getNewValues(option, values))
  }

  return (
    <div
      className={classNames('dui-array-filter', className)}
      data-testid={props['data-testid']}
    >
      {name ? (
        <Header
          sub
          className="dui-array-filter__name"
          data-testid="array-filter-header"
        >
          {name}
        </Header>
      ) : null}
      <div className="dui-array-filter__options">
        {options.map((option) => {
          const isActive = values.includes(option.value)
          return (
            <div
              tabIndex={0}
              role="checkbox"
              aria-checked={isActive}
              key={option.text}
              className={classNames('dui-array-filter__option', {
                ['dui-array-filter__selected-option']: isActive
              })}
              onClick={handleOnClick(option.value)}
              onKeyDown={handleKeyDown(option.value)}
            >
              {option.text}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { ArrayFilter }
