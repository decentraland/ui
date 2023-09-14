import React, { useMemo } from 'react'
import classNames from 'classnames'

import { Item, Props } from './CategoryFilter.types'

import './CategoryFilter.css'

const BASE_ITEM_PADDING_LEFT = 16

export const CategoryFilter = ({ title, items, value, onClick }: Props) => {
  const branch = useMemo(() => {
    const branch = new Set<string>()

    const buildBranchOfSelectedItem = (items: Item[]) => {
      for (const item of items) {
        if (
          item.id === value ||
          (item.children && buildBranchOfSelectedItem(item.children))
        ) {
          branch.add(item.id)
          return true
        }
      }

      return false
    }

    buildBranchOfSelectedItem(items)

    return branch
  }, [items, value])

  return (
    <div className="dui-category-filter">
      <div className="dui-category-filter__title">{title}</div>
      {items.map((item1) => {
        return (
          <>
            <div
              key={item1.id}
              className={classNames('dui-category-filter__item', {
                'dui-category-filter__item--active': value === item1.id
              })}
              style={{ paddingLeft: BASE_ITEM_PADDING_LEFT }}
              onClick={() => onClick(item1.id)}
            >
              {item1.label}
            </div>
            {item1.children &&
              branch.has(item1.id) &&
              item1.children.map((item2) => {
                return (
                  <>
                    <div
                      key={item2.id}
                      className={classNames(
                        'dui-category-filter__item dui-category-filter__item--secondary',
                        {
                          'dui-category-filter__item--active':
                            value === item2.id
                        }
                      )}
                      style={{ paddingLeft: BASE_ITEM_PADDING_LEFT * 2 }}
                      onClick={() => onClick(item2.id)}
                    >
                      {item2.label}
                      {item2.children && (
                        <i
                          className={classNames(
                            'dui-category-filter__item-caret dropdown icon',
                            {
                              'dui-category-filter__item-caret--open':
                                branch.has(item2.id)
                            }
                          )}
                        ></i>
                      )}
                    </div>
                    {item2.children &&
                      branch.has(item2.id) &&
                      item2.children.map((item3) => {
                        return (
                          <div
                            key={item3.id}
                            className={classNames(
                              'dui-category-filter__item dui-category-filter__item--secondary',
                              {
                                'dui-category-filter__item--active':
                                  value === item3.id
                              }
                            )}
                            style={{ paddingLeft: BASE_ITEM_PADDING_LEFT * 3 }}
                            onClick={() => onClick(item3.id)}
                          >
                            {item3.label}
                          </div>
                        )
                      })}
                  </>
                )
              })}
          </>
        )
      })}
    </div>
  )
}
