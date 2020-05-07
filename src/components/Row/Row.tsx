import * as React from 'react'
import './Row.css'

export type RowProps = {
  center?: boolean
  align?: 'left' | 'center' | 'right'
  width?: number
  height?: number
  className?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export class Row extends React.PureComponent<RowProps> {
  static defaultProps: Partial<RowProps> = {
    align: 'left',
    center: false,
    className: ''
  }

  render() {
    const {
      children,
      className,
      onClick,
      align,
      center,
      width,
      height
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
