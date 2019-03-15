import * as React from 'react'
import './Column.css'

export type ColumnProps = {
  center?: boolean
}

export class Column extends React.PureComponent<ColumnProps> {
  static defaultProps: Partial<ColumnProps> = {
    center: false
  }

  render() {
    const { children, center } = this.props
    return (
      <div className={`dcl column ${center ? 'center' : ''}`}>{children}</div>
    )
  }
}
