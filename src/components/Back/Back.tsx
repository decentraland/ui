import * as React from 'react'
import './Back.css'

export type BackProps = {
  className?: string
  absolute?: boolean
}

export class Back extends React.PureComponent<BackProps> {
  render() {
    const { children, className, absolute } = this.props

    const classes = ['dcl', 'back']
    if (className) {
      classes.push(className)
    }

    if (absolute) {
      classes.push('absolute')
    }

    return <div className={classes.join(' ')}>{children}</div>
  }
}
