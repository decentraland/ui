import React, { useMemo } from 'react'
import classNames from 'classnames'
import { CategoryFilterProps } from './CategoryFilter.types'
import { Box } from '../Box'
import { useTabletAndBelowMediaQuery } from '../Media'
import { Item } from '../SideMenu/SideMenuItem'
import { SideMenu } from '../SideMenu'
import './CategoryFilter.css'

export const CategoryFilter = ({
  className,
  i18n,
  items,
  value,
  onClick
}: CategoryFilterProps) => {
  const isMobileOrTablet = useTabletAndBelowMediaQuery()
  const { title } = i18n

  const selectedLabel = useMemo(() => {
    const lookForLabel = (id: Item['id'], items: Item[]) => {
      for (const item of items) {
        if (item.id === id) {
          return item.label
        }
        if (item.children) {
          const label = lookForLabel(id, item.children)
          if (label) {
            return label
          }
        }
      }
      return null
    }
    return lookForLabel(value, items) ?? ''
  }, [items, value])

  const header = useMemo(
    () => (
      <div className="dui-category-filter__header">
        <span className="dui-category-filter__name">{title}</span>
        {isMobileOrTablet ? (
          <span className="dui-category-filter__value">{selectedLabel}</span>
        ) : null}
      </div>
    ),
    [isMobileOrTablet, selectedLabel]
  )

  return (
    <Box
      header={header}
      className={classNames('dui-category-filter', className)}
      collapsible={isMobileOrTablet}
      defaultCollapsed={isMobileOrTablet}
    >
      <SideMenu items={items} value={value} onClick={onClick} />
    </Box>
  )
}
