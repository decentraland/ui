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
}

export const BarChartTooltip = ({
  active,
  payload,
  network
}: BarChartTooltipProps) => {
  if (active && payload && payload.length && payload[0].payload.amount) {
    const values = payload[0].payload.values
    const isLatestRange = values[0] === values[1]
    const lowerBoundLabel = formatAndRoundNumberString(values[0].toString())
    return (
      <div className="custom-tooltip">
        <Mana network={network}>
          <span>{isLatestRange ? `${lowerBoundLabel}+` : lowerBoundLabel}</span>
        </Mana>
        {!isLatestRange ? (
          <>
            <span className="custom-tooltip-separator">-</span>
            <Mana network={network}>
              <span>{formatAndRoundNumberString(values[1].toString())}</span>
            </Mana>
          </>
        ) : null}
      </div>
    )
  }
  return null
}
