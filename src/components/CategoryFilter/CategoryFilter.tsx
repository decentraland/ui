import React, { Fragment, useMemo } from 'react'

import { Item, Props } from './CategoryFilter.types'
import CategoryFilterItem from './CategoryFilterItem'

import './CategoryFilter.css'

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
          <Fragment key={item1.id}>
            <CategoryFilterItem
              item={item1}
              level={1}
              branch={branch}
              value={value}
              onClick={onClick}
            />
            {item1.children &&
              branch.has(item1.id) &&
              item1.children.map((item2) => {
                return (
                  <Fragment key={item2.id}>
                    <CategoryFilterItem
                      item={item2}
                      level={2}
                      branch={branch}
                      value={value}
                      onClick={onClick}
                    />
                    {item2.children &&
                      branch.has(item2.id) &&
                      item2.children.map((item3) => {
                        return (
                          <CategoryFilterItem
                            key={item3.id}
                            item={item3}
                            level={3}
                            branch={branch}
                            value={value}
                            onClick={onClick}
                          />
                        )
                      })}
                  </Fragment>
                )
              })}
          </Fragment>
        )
      })}
    </div>
  )
}
