import * as React from 'react'
import './Box.css'

export type BoxProps = {
  header?: string
  className?: string
  children: React.ReactNode
}

export class Box extends React.PureComponent<BoxProps> {
  render(): JSX.Element {
    const { className, header, children } = this.props

    const classes = ['dcl', 'box']
    if (className) {
      classes.push(className)
    }

    return (
      <div className={classes.join(' ')}>
        {header && <div className={'dcl box-header'}>{header}</div>}
        <div className={'dcl box-children'}>{children}</div>
      </div>
    )
  }
}
