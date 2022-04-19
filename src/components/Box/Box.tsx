import * as React from 'react'
import classNames from 'classnames'
import './Box.css'

export type BoxProps = {
  header?: string
  className?: string
  children: React.ReactNode
}

export class Box extends React.PureComponent<BoxProps> {
  render(): JSX.Element {
    const { className, header, children } = this.props

    return (
      <div className={classNames('dcl box', className)}>
        {header && <div className={'dcl box-header'}>{header}</div>}
        <div className={'dcl box-children'}>{children}</div>
      </div>
    )
  }
}
