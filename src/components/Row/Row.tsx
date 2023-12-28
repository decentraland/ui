import * as React from 'react'
import './Row.css'

export type RowProps = {
  center?: boolean
  align?: 'left' | 'center' | 'right'
  width?: number
  height?: number
  stacked?: boolean
  grow?: boolean
  shrink?: boolean
  className?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export class Row extends React.PureComponent<RowProps> {
  static defaultProps: Partial<RowProps> = {
    align: 'left',
    center: false,
    grow: true,
    shrink: true,
    className: ''
  }

  render(): JSX.Element {
    const {
      children,
      className,
      onClick,
      align,
      center,
      width,
      height,
      stacked,
      grow,
      shrink
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
    if (stacked) {
      classes.push('stacked')
    }
    if (grow) {
      classes.push('grow')
    }
    if (shrink) {
      classes.push('shrink')
    }

    const style: React.CSSProperties = {}
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
