import React from 'react'
import classNames from 'classnames'

import { Props } from './CategoryFilterItem.types'

import './CategoryFilterItem.css'

const ITEM_PADDING_LEFT_BY_LEVEL = {
  1: 24,
  2: 32,
  3: 48
}

export const CategoryFilterItem = ({
  branch,
  value,
  item,
  level,
  onClick
}: Props) => {
  return (
    <div
      key={item.id}
      className={classNames('dui-category-filter-item', {
        'dui-category-filter-item--secondary': level !== 1,
        'dui-category-filter-item--active': value === item.id
      })}
      style={{ paddingLeft: ITEM_PADDING_LEFT_BY_LEVEL[level] }}
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
