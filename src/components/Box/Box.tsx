import * as React from 'react'
import classNames from 'classnames'
import './Box.css'

export type BoxProps = {
  header?: string
  className?: string
  children: React.ReactNode
  childrenClassName?: string
}

export class Box extends React.PureComponent<BoxProps> {
  render(): JSX.Element {
    const { className, header, children, childrenClassName } = this.props

    return (
      <div className={classNames("dcl box", className)}>
        {header && <div className={"dcl box-header"}>{header}</div>}
        <div className={classNames("dcl box-children", childrenClassName)}>
          {children}
        </div>
      </div>
    )
  }
}
