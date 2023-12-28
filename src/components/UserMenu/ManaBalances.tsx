import React from 'react'

import { Network } from '@dcl/schemas'
import classNames from 'classnames'

import { ManaBalancesProps } from './UserMenu.types'
import { Mana } from '../Mana/Mana'
import { config } from '../../config'

export const ManaBalances = (props: ManaBalancesProps) => {
  const { manaBalances, onClickBalance } = props

  return (
    <span className={classNames('dcl', 'account-wrapper')}>
      {manaBalances &&
        Object.keys(manaBalances).map((network) => (
          <Mana
            key={network}
            network={network as Network}
            size="small"
            className={classNames(onClickBalance && 'clickable')}
            title={`${manaBalances[network].toLocaleString()} MANA`}
            href={config.get('ACCOUNT_URL')}
          >
            {Number(manaBalances[network].toFixed(2)).toLocaleString()}
          </Mana>
        ))}
    </span>
  )
}