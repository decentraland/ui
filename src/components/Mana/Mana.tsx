import * as React from 'react'
import classNames from 'classnames'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { Header, HeaderProps } from '../Header/Header'
import './Mana.css'

export type ManaProps = {
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge'
  inline?: boolean
  network?: Network
  className?: string
  children?: React.ReactChild
  primary?: boolean
}

export class Mana extends React.Component<ManaProps & HeaderProps> {
  static defaultProps = {
    className: '',
    network: Network.ETHEREUM,
    primary: false
  }

  render(): JSX.Element {
    const { size, className, inline, children, network, primary, ...rest } =
      this.props

    return (
      <Header
        size={size}
        className={classNames(
          'dcl',
          'mana',
          inline ? 'inline ' : null,
          className
        )}
        {...rest}
      >
        <i className="symbol">
          <i
            className={classNames(
              network.toLowerCase(),
              primary ? 'primary' : null
            )}
          />
        </i>
        {children}
      </Header>
    )
  }
}
