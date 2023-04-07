import * as React from 'react'
import classNames from 'classnames'
import { Network } from '@dcl/schemas'
import { getNetworkMANADescription } from '../../lib/network'
import { Button } from '../Button/Button'
import './Network.css'

export enum NetworkGatewayType {
  MOON_PAY = 'moonPay',
  TRANSAK = 'transak'
}

export type GatewaysNames = {
  [key in NetworkGatewayType]: string
}

export const gatewaysNames: GatewaysNames = {
  [NetworkGatewayType.MOON_PAY]: 'MoonPay',
  [NetworkGatewayType.TRANSAK]: 'Transak'
}

export type BuyWithFiatNetworkProps = {
  className?: string
  message?: React.ReactNode
  open?: boolean
  i18n?: NetworkI18N
  type: Network
  gateways: Omit<NetworkGatewayProps, 'network'>[]
  onClose?: () => void
  onInfo?: () => void
  onBack?: () => void
}

export type NetworkGatewayProps = {
  type: NetworkGatewayType
  network: Network
  learnMoreLink?: string
  i18n?: NetworkGatewayI18N
  disabled?: boolean
  onContinue: () => void
}

export type NetworkI18N = {
  title: React.ReactNode
  error: React.ReactNode
}

export type NetworkGatewayI18N = {
  title: React.ReactNode
  subtitle: React.ReactNode
  continueButtonText: React.ReactNode
  learnMoreText: React.ReactNode
}

class ButWithFiatNetworkGateway extends React.PureComponent<NetworkGatewayProps> {
  render(): JSX.Element {
    const {
      type,
      network,
      i18n,
      learnMoreLink,
      disabled = false,
      onContinue
    } = this.props

    const title: React.ReactNode = `Buy ${getNetworkMANADescription(
      network
    )} with ${gatewaysNames[type]}`
    const subtitle: React.ReactNode =
      'You can buy with debit and credit cards, Apple Pay, Google Pay, or via bank transfer.'
    const continueButtonText: React.ReactNode = `Continue with ${gatewaysNames[type]}`

    return (
      <div className={classNames('dcl', 'gateway', type, disabled)}>
        <div className="image" />
        <div className="info">
          <div className="diseableable-container">
            <div className="title">{i18n?.title || title}</div>
            <div className="subtitle">{i18n?.subtitle || subtitle}</div>
            <Button
              primary
              onClick={onContinue}
              className={'continue-button'}
              disabled={disabled}
            >
              {i18n?.continueButtonText || continueButtonText}
            </Button>
          </div>
          {i18n?.learnMoreText ? (
            <a
              className="learn-more"
              href={learnMoreLink}
              target="_blank"
              rel="external"
            >
              {i18n?.learnMoreText}
            </a>
          ) : (
            <span className="learn-more">
              <a href={learnMoreLink} target="_blank" rel="external">
                Learn more
              </a>
              {` about ${gatewaysNames[type]}`}
            </span>
          )}
        </div>
      </div>
    )
  }
}

export class BuyWithFiatNetwork extends React.Component<BuyWithFiatNetworkProps> {
  static Gateway = ButWithFiatNetworkGateway

  enabledFirst(
    { disabled: disabledA = false },
    { disabled: disabledB = false }
  ): number {
    return Number(disabledA) - Number(disabledB)
  }

  render(): JSX.Element {
    const { type, gateways } = this.props

    return (
      <div className="gateways-container">
        {gateways.sort(this.enabledFirst).map((gatewayProps) => (
          <ButWithFiatNetworkGateway
            {...gatewayProps}
            key={gatewayProps.type}
            network={type}
          />
        ))}
      </div>
    )
  }
}
