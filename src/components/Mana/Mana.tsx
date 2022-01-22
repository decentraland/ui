import * as React from 'react'
import { Network } from '@dcl/schemas'
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
    console.log(this.props)
    const classes = `dcl mana ${inline ? 'inline ' : ''}${className}`.trim()
    return (
      <Header size={size} className={classes} {...rest}>
        <i className="symbol">
          {network !== Network.ETHEREUM ? (
            <i className={network.toLowerCase()} />
          ) : (
            <img className='mana-svg' src='https://user-images.githubusercontent.com/2781777/150567170-9559151d-0b37-4026-b2b3-ced7e79dbe4f.svg'/>
          )}
        </i>
        {children}
      </Header>
    )
  }
}
