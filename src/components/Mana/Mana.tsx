import * as React from 'react'
import classNames from 'classnames'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { getNetworkMANADescription } from '../../lib/network'
import { Header, HeaderProps } from '../Header/Header'
import { Popup } from '../Popup/Popup'
import './Mana.css'

export type ManaProps = {
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge'
  inline?: boolean
  network?: Network
  className?: string
  children?: React.ReactChild
  primary?: boolean
  showTooltip?: boolean
}

export class Mana extends React.Component<ManaProps & HeaderProps> {
  static defaultProps = {
    className: '',
    network: Network.ETHEREUM,
    primary: false
  }

  render(): JSX.Element {
    const {
      size,
      className,
      inline,
      children,
      network,
      primary,
      showTooltip,
      ...rest
    } = this.props

    const ManaInner = (
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

    return showTooltip ? (
      <Popup
        position="top center"
        content={getNetworkMANADescription(network)}
        trigger={ManaInner}
        basic
      />
    ) : (
      ManaInner
    )
  }
}
