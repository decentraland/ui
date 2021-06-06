import * as React from 'react'
import './Empty.css'

export type EmptyProps = {
  height?: number
  expand?: boolean
  className?: string
}

export class Empty extends React.PureComponent<EmptyProps> {
  render(): JSX.Element {
    const { children, className, height, expand } = this.props

    const classes = ['dcl', 'empty']
    if (className) {
      classes.push(className)
    }

    if (expand) {
      classes.push('expand')
    }

    const style: React.CSSProperties = {}
    if (height) {
      style.height = height
    }

    return (
      <div className={classes.join(' ')} style={style}>
        {children}
      </div>
    )
  }
}
