import * as React from 'react'
import './Back.css'

export type BackProps = {
  className?: string
  absolute?: boolean
  onClick?: () => void
}

export class Back extends React.PureComponent<BackProps> {
  render(): JSX.Element {
    const { children, className, absolute, onClick } = this.props

    const classes = ['dcl', 'back']
    if (className) {
      classes.push(className)
    }

    if (absolute) {
      classes.push('absolute')
    }

    return (
      <div className={classes.join(' ')} onClick={onClick}>
        {children}
      </div>
    )
  }
}
