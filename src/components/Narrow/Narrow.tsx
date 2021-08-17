import * as React from 'react'
import './Narrow.css'

export type NarrowProps = {
  className?: string
}

export class Narrow extends React.PureComponent<NarrowProps> {
  render(): JSX.Element {
    const { children, className } = this.props

    const classes = ['dcl', 'narrow']
    if (className) {
      classes.push(className)
    }

    return <div className={classes.join(' ')}>{children}</div>
  }
}
