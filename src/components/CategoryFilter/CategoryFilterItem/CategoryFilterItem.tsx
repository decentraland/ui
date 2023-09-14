import React from 'react'
import classNames from 'classnames'

import { Props } from './CategoryFilterItem.types'

import './CategoryFilterItem.css'

export const CategoryFilterItem = ({
  branch,
  value,
  item,
  level,
  onClick
}: Props) => {
  return (
    <div
      className={classNames(
        'dui-category-filter-item',
        `dui-category-filter-item--level-${level}`,
        {
          'dui-category-filter-item--active': value === item.id
        }
      )}
      onClick={() => onClick(item.id)}
    >
      {item.label}
      {level === 2 && item.children && (
        <i
          className={classNames(
            'dui-category-filter-item__caret dropdown icon',
            {
              'dui-category-filter-item__caret--open': branch.has(item.id)
            }
          )}
        ></i>
      )}
    </div>
  )
}
