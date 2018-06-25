import * as React from 'react'
import './Address.css'

type Props = {
  value: string
  strong?: boolean
  shorten?: boolean
  tooltip?: boolean
  className?: string
}

type State = {}

export class Address extends React.Component<Props, State> {
  static defaultProps = {
    className: '',
    strong: false,
    shorten: true
  }

  render() {
    const { className, strong, shorten, tooltip, value } = this.props
    const classes = `dcl address ${className}`.trim()
    const address = shorten
      ? value.slice(0, 4) + '...' + value.slice(-4)
      : value
    const tooltipProps = tooltip
      ? { 'data-balloon': value, 'data-balloon-pos': 'up' }
      : {}
    return strong ? (
      <strong className={classes} {...tooltipProps}>
        {address}
      </strong>
    ) : (
      <span className={classes} {...tooltipProps}>
        {address}
      </span>
    )
  }
}
