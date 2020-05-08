import * as React from 'react'
import './Empty.css'

export type EmptyProps = {
  height?: number
  className?: string
}

export class Empty extends React.PureComponent<EmptyProps> {
  render() {
    const { children, className, height } = this.props

    const classes = ['dcl', 'empty']
    if (className) {
      classes.push(className)
    }

    let style: React.CSSProperties = {}
    if (height) {
      style.height = height
    } else {
      style.bottom = 0
    }

    return (
      <div className={classes.join(' ')} style={style}>
        {children}
      </div>
    )
  }
}
