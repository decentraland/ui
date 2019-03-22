import * as React from 'react'
import './Row.css'

export type RowProps = {
  center?: boolean
  className?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export class Row extends React.PureComponent<RowProps> {
  static defaultProps: Partial<RowProps> = {
    center: false,
    className: ''
  }

  render() {
    const { children, className, onClick, center } = this.props
    return (
      <div
        className={`dcl row ${center ? 'center' : ''} ${className}`}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }
}
