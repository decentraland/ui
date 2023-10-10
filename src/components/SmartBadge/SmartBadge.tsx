import React from 'react'
import classNames from 'classnames'
import { IconBadge } from '../IconBadge/IconBadge'
import { SmartBadgeProps } from './SmartBadge.types'
import './SmartBadge.css'

export const SmartBadge = ({ clickable = true, i18n }: SmartBadgeProps) => {
  const { title = 'Smart' } = i18n || {}

  return (
    <IconBadge
      icon="smart-wearable"
      className={classNames('dui-smart-badge', { clickable })}
      text={title}
    />
  )
}
