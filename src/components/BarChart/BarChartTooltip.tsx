import * as React from 'react'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { Mana } from '../Mana/Mana'
import { formatAndRoundNumberString } from './utils'
import './BarChart.css'

export type BarChartTooltipProps = {
  payload?: {
    payload: { name: string; values: [number, number]; amount: number }
  }[]
  active?: boolean
  network: Network
  isMana: boolean
}

export const BarChartTooltip = ({
  active,
  payload,
  network,
  isMana
}: BarChartTooltipProps) => {
  if (active && payload && payload.length && payload[0].payload.amount) {
    const values = payload[0].payload.values
    const isLatestRange = values[0] === values[1]
    const lowerBound = formatAndRoundNumberString(values[0].toString())
    const lowerBoundLabel = (
      <span>{isLatestRange ? `${lowerBound}+` : lowerBound}</span>
    )
    const upperBoundLabel = (
      <span>{formatAndRoundNumberString(values[1].toString())}</span>
    )
    return (
      <div className="custom-tooltip">
        {isMana ? (
          <Mana network={network}>{lowerBoundLabel}</Mana>
        ) : (
          lowerBoundLabel
        )}
        {!isLatestRange ? (
          <>
            <span className="custom-tooltip-separator">-</span>
            {isMana ? (
              <Mana network={network}>{upperBoundLabel}</Mana>
            ) : (
              upperBoundLabel
            )}
          </>
        ) : null}
      </div>
    )
  }
  return null
}
