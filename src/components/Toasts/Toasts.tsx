import * as React from 'react'

import { Props } from './Toasts.types'
import './Toasts.css'

export default class Toasts extends React.PureComponent<Props> {
  render() {
    const { position = 'bottom right', children } = this.props

    const className = ['dcl', 'toasts', ...position.split(' ')]

    return <div className={className.join(' ')}>{children}</div>
  }
}
