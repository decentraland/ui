import classNames from 'classnames'
import React, { useMemo } from 'react'
import { Box } from '../Box'
import { useTabletAndBelowMediaQuery } from '../Media'
import { RadioOptions } from '../RadioOptions'
import { AssetStatus, AssetStatusFilterProps } from './AssetStatusFilter.types'
import './AssetStatusFilter.css'

export const AssetStatusFilter = (props: AssetStatusFilterProps) => {
  const { i18n, onChange, value, className, defaultCollapsed = false } = props

  const isMobileOrTablet = useTabletAndBelowMediaQuery()
  const options = useMemo(
    () =>
      Object.values(AssetStatus).map((opt) => ({
        value: opt as AssetStatus,
        name: i18n.status[opt],
        info: i18n.tooltips[opt]
      })),
    [i18n.status, i18n.tooltips]
  )

  const header = useMemo(
    () => (
      <div className="dui-asset-status-filter__header">
        <span className="dui-asset-status-filter__name">{i18n.title}</span>
        {isMobileOrTablet ? (
          <span className="dui-asset-status-filter__value">
            {i18n.status[value]}
          </span>
        ) : null}
      </div>
    ),
    [isMobileOrTablet, value, i18n.status]
  )

  return (
    <Box
      header={header}
      className={classNames('dui-asset-status-filter', className)}
      collapsible
      defaultCollapsed={defaultCollapsed || isMobileOrTablet}
    >
      <RadioOptions value={value} options={options} onChange={onChange} />
    </Box>
  )
}
