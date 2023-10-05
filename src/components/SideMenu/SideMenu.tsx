import React, { Fragment, useCallback, useMemo } from 'react'

import { SideMenuItem, Item } from './SideMenuItem'
import { SideMenuProps } from './SideMenu.types'

import './SideMenu.css'

export const SideMenu = ({ items, value, onClick }: SideMenuProps) => {
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

  const shouldRenderChildren = useCallback(
    (item: Item) => item.children && branch.has(item.id),
    [branch]
  )

  return (
    <ul className="dui-side-menu">
      {items.map((item1) => (
        <Fragment key={item1.id}>
          <SideMenuItem
            item={item1}
            level={1}
            branch={branch}
            value={value}
            onClick={onClick}
          />
          {shouldRenderChildren(item1) &&
            item1.children.map((item2) => (
              <Fragment key={item2.id}>
                <SideMenuItem
                  item={item2}
                  level={2}
                  branch={branch}
                  value={value}
                  onClick={onClick}
                />
                {shouldRenderChildren(item2) &&
                  item2.children.map((item3) => (
                    <SideMenuItem
                      key={item3.id}
                      item={item3}
                      level={3}
                      branch={branch}
                      value={value}
                      onClick={onClick}
                    />
                  ))}
              </Fragment>
            ))}
        </Fragment>
      ))}
    </ul>
  )
}
