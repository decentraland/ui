import React from 'react'
import classNames from 'classnames'

import { Props } from './CategoryFilter.types'

import './CategoryFilter.css'

export const CategoryFilter = ({ title, items, value }: Props) => {
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
            >
              {item1.label}
            </div>
            {item1.children &&
              item1.children.map((item2) => {
                return (
                  <>
                    <div
                      key={item2.id}
                      className={classNames(
                        'dui-category-filter__item ',
                        'dui-category-filter__item--secondary',
                        'dui-category-filter__item--level-2',
                        {
                          'dui-category-filter__item--active':
                            value === item2.id
                        }
                      )}
                    >
                      {item2.label}{' '}
                      {item2.children && (
                        <i
                          className={classNames(
                            'dui-category-filter__item-caret dropdown icon',
                            {
                              'dui-category-filter__item-caret--open':
                                value === item2.id
                            }
                          )}
                        ></i>
                      )}
                    </div>
                    {item2.children &&
                      item2.children.map((item3) => {
                        return (
                          <div
                            key={item3.id}
                            className={classNames(
                              'dui-category-filter__item',
                              'dui-category-filter__item--secondary',
                              'dui-category-filter__item--level-3',
                              {
                                'dui-category-filter__item--active':
                                  value === item3.id
                              }
                            )}
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
