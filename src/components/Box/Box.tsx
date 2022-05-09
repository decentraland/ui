import * as React from 'react'
import './Box.css'

export type BoxProps = {
  header?: string
  className?: string
  children: React.ReactNode
  borderless?: boolean
}

export class Box extends React.PureComponent<BoxProps> {
  render(): JSX.Element {
    const { className, header, children, borderless } = this.props

    const classes = ['dcl', 'box']
    if (className) {
      classes.push(className)
    }
    if (borderless) {
      classes.push('borderless')
    }

    return (
      <div className={classes.join(' ')}>
        {header && <div className={'dcl box-header'}>{header}</div>}
        <div className={'dcl box-children'}>{children}</div>
      </div>
    )
  }
}
