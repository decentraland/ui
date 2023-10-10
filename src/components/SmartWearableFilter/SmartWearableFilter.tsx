import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { Checkbox, CheckboxProps } from '../Checkbox/Checkbox'
import { SmartBadge } from '../SmartBadge'
import { Box } from '../Box'
import { useTabletAndBelowMediaQuery } from '../Media'
import './SmartWearableFilter.css'

export type SmartWearableFilterProps = {
  isOnlySmart?: boolean
  onChange: (value: boolean) => void
  'data-testid'?: string
  className?: string
  i18n?: {
    title: string
    selected: string
  }
  defaultCollapsed?: boolean
}

export const SmartWearableFilter = (props: SmartWearableFilterProps) => {
  const {
    isOnlySmart,
    onChange,
    i18n,
    className,
    defaultCollapsed = false
  } = props
  const { title = 'Smart', selected = 'Only Smart' } = i18n || {}
  const isMobileOrTablet = useTabletAndBelowMediaQuery()

  const handleChange = useCallback(
    (_, props: CheckboxProps) => {
      onChange(!!props.checked)
    },
    [onChange]
  )

  const header = useMemo(
    () => (
      <div className="dui-smart-wearable-filter__header">
        {isMobileOrTablet ? (
          <>
            <span className="dui-smart-wearable-filter__name">{title}</span>
            {isOnlySmart ? (
              <span className="dui-smart-wearable-filter__value">
                {selected}
              </span>
            ) : null}
          </>
        ) : (
          title
        )}
      </div>
    ),
    [selected, isMobileOrTablet, isOnlySmart]
  )

  return (
    <Box
      header={header}
      className={classNames('dui-smart-wearable-filter', className)}
      collapsible
      defaultCollapsed={defaultCollapsed || isMobileOrTablet}
    >
      <div
        className="dui-smart-wearable-filter__content"
        data-testid={props['data-testid']}
      >
        <SmartBadge clickable={false} i18n={i18n} />
        <Checkbox toggle checked={!!isOnlySmart} onChange={handleChange} />
      </div>
    </Box>
  )
}
