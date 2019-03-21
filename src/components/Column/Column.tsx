import * as React from 'react'
import './Column.css'

export type ColumnProps = {
  center?: boolean
  className?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export class Column extends React.PureComponent<ColumnProps> {
  static defaultProps: Partial<ColumnProps> = {
    center: false,
    className: ''
  }

  render() {
    const { children, className, center, onClick } = this.props
    return (
      <div
        className={`dcl column ${center ? 'center' : ''} ${className}`}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }
}
