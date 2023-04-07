import * as React from 'react'
import ModalContent from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalContent'
import classNames from 'classnames'
import { Network } from '@dcl/schemas'
import { getNetworkMANADescription } from '../../lib/network'
import { Modal } from '../Modal/Modal'
import { ModalNavigation } from '../ModalNavigation/ModalNavigation'
import { Loader } from '../Loader/Loader'
import {
  BuyWithFiatNetwork,
  NetworkGatewayProps,
  BuyWithFiatNetworkProps
} from './Network'
import './BuyManaWithFiatModal.css'
import './Network.css'

type SelectedNetwork = BuyManaWithFiatModalNetworkProps &
  BuyWithFiatNetworkProps

export type BuyManaWithFiatModalProps = {
  className?: string
  message?: React.ReactNode
  hasError?: boolean
  open?: boolean
  loading?: boolean
  i18n?: BuyManaWithFiatModalI18N
  networks: (BuyManaWithFiatModalNetworkProps & BuyWithFiatNetworkProps)[]
  onClose?: () => void
  onInfo?: () => void
}

export type BuyManaWithFiatModalNetworkProps = {
  type: Network
  i18n?: BuyManaWithFiatModalNetworkI18N
  gateways: Omit<NetworkGatewayProps, 'network'>[]
  onClick?: () => void
}

export type BuyManaWithFiatModalI18N = {
  title: React.ReactNode
  subtitle: React.ReactNode
  error: React.ReactNode
}

export type BuyManaWithFiatModalNetworkI18N = {
  cta: React.ReactNode
  ctaSubtitle: React.ReactNode
}

class BuyManaWithFiatModalNetwork extends React.PureComponent<BuyManaWithFiatModalNetworkProps> {
  render(): JSX.Element {
    const { type, i18n, onClick } = this.props
    const networkMANADescription = getNetworkMANADescription(type)

    const cta: React.ReactNode = networkMANADescription
    let ctaSubtitle: React.ReactNode = ''

    switch (type) {
      case Network.MATIC:
        ctaSubtitle = `Use it to buy most wearables and emotes in ${networkMANADescription}.`
        break

      case Network.ETHEREUM:
        ctaSubtitle = `Use it to buy LAND, names and specific wearables in ${networkMANADescription}.`
        break
    }

    return (
      <div
        className={`dcl option ${type.toLowerCase()}`}
        onClick={onClick}
        key={type}
      >
        <div className="image" />
        <div className="info">
          <div className="cta">{i18n?.cta || cta}</div>
          <div className="ctaSubtitle">{i18n?.ctaSubtitle || ctaSubtitle}</div>
        </div>
      </div>
    )
  }
}

export class BuyManaWithFiatModal extends React.Component<BuyManaWithFiatModalProps> {
  state: Readonly<{
    selectedNetwork: SelectedNetwork
  }> = {
    selectedNetwork: null
  }

  static defaultProps = {
    className: '',
    hasError: false,
    loading: false,
    i18n: {
      title: 'Buy MANA',
      subtitle: 'Select which mana you want to buy',
      message: '',
      error: 'Could not process the payment'
    }
  }

  static Network = BuyManaWithFiatModalNetwork

  componentDidMount() {
    if (this.props.networks.length === 1) {
      this.setState({ selectedNetwork: this.props.networks[0] })
    }
  }

  componentDidUpdate(): void {
    if (
      this.props.networks &&
      this.props.networks.length === 1 &&
      !this.state.selectedNetwork
    ) {
      this.setState({ selectedNetwork: this.props.networks[0] })
    }
  }

  unselectNetwork = () => this.setState({ selectedNetwork: null })

  handleOnClose = () => {
    this.unselectNetwork()
    this.props.onClose()
  }

  handleNetworkOnClick = (network: SelectedNetwork) => {
    this.setState({
      selectedNetwork: network
    })
    network.onClick?.()
  }

  render(): JSX.Element {
    const { selectedNetwork } = this.state

    const { className, message, i18n, onInfo } = selectedNetwork
      ? selectedNetwork
      : this.props

    const title: React.ReactNode =
      i18n?.title ||
      (selectedNetwork
        ? `Buy ${getNetworkMANADescription(selectedNetwork.type)}`
        : 'Buy MANA')
    const defaultNetworkMessage: React.ReactNode =
      'If this is the first time you use any of these providers you will first need to create an account on their platform. If you have already have an account, you will just need to login.'

    let errorClasses = 'error'
    if (this.props.hasError) {
      errorClasses += ' visible'
    }

    return (
      <Modal
        open={this.props.open}
        className={classNames(
          'dcl',
          selectedNetwork ? 'network' : 'buy-mana-with-fiat-modal',
          className,
          selectedNetwork?.type.toLowerCase().replace(' ', '-')
        )}
      >
        <ModalNavigation
          title={title}
          subtitle={selectedNetwork ? '' : this.props.i18n.subtitle}
          onInfo={onInfo}
          onClose={this.handleOnClose}
          onBack={
            selectedNetwork &&
            this.props.networks.length > 1 &&
            this.unselectNetwork
          }
        />
        <ModalContent>
          {selectedNetwork ? (
            <BuyWithFiatNetwork
              type={selectedNetwork.type}
              gateways={selectedNetwork.gateways}
            />
          ) : (
            this.props.networks.map((network) => (
              <BuyManaWithFiatModalNetwork
                {...network}
                key={network.type}
                type={network.type}
                onClick={() => this.handleNetworkOnClick(network)}
              />
            ))
          )}
          {message || selectedNetwork ? (
            <small className="message">
              {message || defaultNetworkMessage}
            </small>
          ) : null}
        </ModalContent>
        {this.props.hasError ? (
          <p className={errorClasses}>{i18n.error}</p>
        ) : null}
        {this.props.loading ? (
          <>
            <Loader size="big" active />
            <div className="loader-background"></div>
          </>
        ) : null}
      </Modal>
    )
  }
}
