import * as React from 'react'
import './Row.css'

export type RowProps = {
  center?: boolean
}

export class Row extends React.PureComponent<RowProps> {
  static defaultProps: Partial<RowProps> = {
    center: false
  }

  render() {
    const { children, center } = this.props
    return <div className={`dcl row ${center ? 'center' : ''}`}>{children}</div>
  }
}
