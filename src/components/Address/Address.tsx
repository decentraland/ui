import * as React from 'react'
import './Address.css'

export type AddressProps = {
  value: string
  strong?: boolean
  shorten?: boolean
  tooltip?: boolean
  className?: string
}

export class Address extends React.Component<AddressProps> {
  static defaultProps = {
    className: '',
    strong: false,
    shorten: true
  }

  render(): JSX.Element {
    const { className, strong, shorten, tooltip, value } = this.props
    const classes = `dcl address ${className}`.trim()
    const address = shorten
      ? value.slice(0, 6) + '\u2026' + value.slice(-4)
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
