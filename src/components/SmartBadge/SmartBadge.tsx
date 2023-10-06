import React from 'react'
import classNames from 'classnames'
import IconBadge from '../IconBadge'
import { Props } from './SmartBadge.types'
import { SmartIcon } from '../SmartIcon/SmartIcon'
import './SmartBadge.css'

const SmartBadge = ({ clickable = true, i18n }: Props) => {
  const { title = 'Smart' } = i18n || {}

  return (
    <IconBadge className={classNames('SmartBadge', { clickable })} text={title}>
      <SmartIcon />
    </IconBadge>
  )
}

export default React.memo(SmartBadge)
