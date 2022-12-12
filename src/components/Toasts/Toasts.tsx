import * as React from 'react'

import { useMobileMediaQuery } from '../Media'
import './Toasts.css'

export type ToastPosition =
  | 'bottom left'
  | 'bottom center'
  | 'bottom right'
  | 'top left'
  | 'top center'
  | 'top right'

export type ToastsProps = {
  position?: ToastPosition
  children: React.ReactNode
}

export const Toasts = (props: ToastsProps) => {
  const newPosition: ToastPosition = useMobileMediaQuery()
    ? 'bottom center'
    : 'top right'

  const { position = newPosition, children } = props

  const className = ['dcl', 'toasts', ...position.split(' ')]

  return <div className={className.join(' ')}>{children}</div>
}
