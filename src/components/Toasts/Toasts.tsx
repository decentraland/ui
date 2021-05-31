import * as React from 'react'
import './Toasts.css'

export type ToastPosition =
  | 'bottom left'
  | 'bottom right'
  | 'top left'
  | 'top right'

export type ToastsProps = {
  position?: ToastPosition
  children: React.ReactNode
}

export default class Toasts extends React.PureComponent<ToastsProps> {
  render() {
    const { position = 'top right', children } = this.props

    const className = ['dcl', 'toasts', ...position.split(' ')]

    return <div className={className.join(' ')}>{children}</div>
  }
}
