import * as React from 'react'
import './Column.css'

export type ColumnProps = {
  align: 'left' | 'center' | 'right'
  center?: boolean
  grow?: boolean
  shrink?: boolean
  width?: number
  height?: number
  className?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export class Column extends React.PureComponent<ColumnProps> {
  static defaultProps: Partial<ColumnProps> = {
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
      center,
      align,
      width,
      height,
      grow,
      shrink,
      onClick
    } = this.props
    const classes = ['dcl', 'column']
    if (center) {
      console.warn(
        `The prop 'center' has been deprecated from <Column> component, use aligh="center" instead.`
      )
      classes.push('center')
    } else {
      classes.push(align)
    }
    if (className) {
      classes.push(className)
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
