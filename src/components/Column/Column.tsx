import * as React from 'react'
import './Column.css'

export type ColumnProps = {
  align: 'left' | 'center' | 'right'
  center?: boolean
  width?: number
  height?: number
  className?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export class Column extends React.PureComponent<ColumnProps> {
  static defaultProps: Partial<ColumnProps> = {
    align: 'left',
    center: false,
    className: ''
  }

  render() {
    const {
      children,
      className,
      center,
      align,
      width,
      height,
      onClick
    } = this.props
    const classes = ['dcl', 'row']
    if (center) {
      console.warn(
        `The prop 'center' has been deprecated from <Row> component, use aligh="center" instead.`
      )
      classes.push('center')
    } else {
      classes.push(align)
    }
    if (className) {
      classes.push(className)
    }

    let style: React.CSSProperties = {}
    if (width) {
      style.width = width
    }
    if (height) {
      style.height = height
    }

    return (
      <div className={classes.join(' ')} onClick={onClick} style={style}>
        {children}
      </div>
    )
  }
}
