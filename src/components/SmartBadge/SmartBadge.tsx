import React from 'react'
import classNames from 'classnames'
import IconBadge from '../IconBadge'
import { Props } from './SmartBadge.types'
import './SmartBadge.css'

const SmartBadge = ({ clickable = true, i18n }: Props) => {
  const { title = 'Smart' } = i18n || {}

  return (
    <IconBadge
      icon="smart-wearable"
      className={classNames('dui-smart-badge', { clickable })}
      text={title}
    />
  )
}

export default React.memo(SmartBadge)
