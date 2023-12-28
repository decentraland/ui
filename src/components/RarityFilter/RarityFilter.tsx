import React, { useMemo, useCallback } from 'react'
import classNames from 'classnames'
import { Rarity } from '@dcl/schemas'
import { Box } from '../Box'
import { InfoTooltip } from '../InfoTooltip'
import { useTabletAndBelowMediaQuery } from '../../components/Media'
import { ArrayFilter } from '../ArrayFilter'
import { RarityFilterProps } from './RarityFilter.types'
import './RarityFilter.css'

const RarityFilter = (props: RarityFilterProps) => {
  const {
    onChange,
    rarities,
    i18n,
    className,
    defaultCollapsed = false
  } = props

  const isMobileOrTablet = useTabletAndBelowMediaQuery()
  const rarityOptions = useMemo(() => {
    const options = Object.values(Rarity)
      .filter((value) => typeof value === 'string')
      .reverse() as string[]
    return options.map((rarity) => ({
      value: rarity,
      text: i18n.rarities[rarity as Rarity]
    }))
  }, [])

  const handleRaritiesChange = useCallback(
    (newValue: string[]) => {
      onChange(newValue as Rarity[])
    },
    [onChange]
  )

  const allRaritiesSelected =
    rarities.length === 0 || rarities.length === rarityOptions.length

  const header = useMemo(
    () => (
      <div className="dui-rarity-filter__header">
        {!isMobileOrTablet ? (
          <>
            <div className="dui-rarity-filter__name">{i18n.title}</div>
            <InfoTooltip content={i18n.tooltip} position="bottom left" />
          </>
        ) : (
          <>
            <span className="dui-rarity-filter__name">{i18n.title}</span>
            <span className="dui-rarity-filter__value">
              {allRaritiesSelected
                ? i18n.all_rarities
                : i18n.count_rarities(rarities.length)}
            </span>
          </>
        )}
      </div>
    ),
    [rarities, isMobileOrTablet, allRaritiesSelected]
  )

  return (
    <Box
      header={header}
      className={classNames('dui-rarity-filter', className)}
      collapsible
      defaultCollapsed={defaultCollapsed || isMobileOrTablet}
    >
      <ArrayFilter
        options={rarityOptions}
        onChange={handleRaritiesChange}
        values={rarities}
      />
    </Box>
  )
}

export { RarityFilter }
