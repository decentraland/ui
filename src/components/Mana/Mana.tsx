import * as React from 'react'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { Header, HeaderProps } from '../Header/Header'
import './Mana.css'

export type ManaProps = {
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge'
  inline?: boolean
  network?: Network
  className?: string
  children?: React.ReactChild
}

export class Mana extends React.Component<ManaProps & HeaderProps> {
  static defaultProps = {
    className: '',
    network: Network.ETHEREUM
  }

  render(): JSX.Element {
    const { size, className, inline, children, network, ...rest } = this.props
    const classes = `dcl mana ${inline ? 'inline ' : ''}${className}`.trim()
    return (
      <Header size={size} className={classes} {...rest}>
        <i className="symbol">
          <i className={network.toLowerCase()} />
        </i>
        {children}
      </Header>
    )
  }
}
