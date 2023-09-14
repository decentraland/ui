import React, { useMemo } from 'react'

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
          <>
            <CategoryFilterItem
              branch={branch}
              value={value}
              item={item1}
              level={1}
              onClick={onClick}
            ></CategoryFilterItem>
            {item1.children &&
              branch.has(item1.id) &&
              item1.children.map((item2) => {
                return (
                  <>
                    <CategoryFilterItem
                      branch={branch}
                      value={value}
                      item={item2}
                      level={2}
                      onClick={onClick}
                    ></CategoryFilterItem>
                    {item2.children &&
                      branch.has(item2.id) &&
                      item2.children.map((item3) => {
                        return (
                          <CategoryFilterItem
                            branch={branch}
                            value={value}
                            item={item3}
                            level={3}
                            onClick={onClick}
                          ></CategoryFilterItem>
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
