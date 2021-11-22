import * as React from 'react'
import { Button } from '../Button/Button'
import { Header } from '../Header/Header'
import { StarWalletIcon } from '../StarWalletIcon/StarWalletIcon'
import './SignIn.css'

export type SignInI18N = {
  header: React.ReactNode
  message: React.ReactNode
  connect: React.ReactNode
  connecting: React.ReactNode
  connected: React.ReactNode
  error: React.ReactNode
}

export type SignInProps = {
  center?: boolean
  isConnected?: boolean
  isConnecting?: boolean
  hasError?: boolean
  onConnect?: () => void
  i18n?: SignInI18N
}

export class SignIn extends React.PureComponent<SignInProps> {
  static defaultProps: Partial<SignInProps> = {
    center: true,
    isConnected: false,
    isConnecting: false,
    hasError: false,
    onConnect: () => undefined,
    i18n: {
      header: 'Get Started',
      message: (
        <span>
          You can use the{' '}
          <a
            href="https://metamask.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            MetaMask
          </a>{' '}
          extension or a hardware wallet like{' '}
          <a
            href="https://www.ledger.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ledger Nano S
          </a>
          .
        </span>
      ),
      connect: 'Connect',
      connecting: 'Connecting...',
      connected: 'Connected',
      error: 'Could not connect to wallet.'
    }
  }

  render(): JSX.Element {
    const { center, isConnecting, isConnected, onConnect, hasError, i18n } =
      this.props
    let classes = 'SignIn'
    if (center) {
      classes += ' center'
    }
    let errorClasses = 'error'
    if (hasError && !isConnecting && !isConnected) {
      errorClasses += ' visible'
    }
    return (
      <div className={classes}>
        <Header>{i18n.header}</Header>
        <StarWalletIcon />
        <p className="message">{i18n.message}</p>

        <Button
          primary
          onClick={onConnect}
          disabled={isConnecting || isConnected}
        >
          {isConnecting
            ? i18n.connecting
            : isConnected
            ? i18n.connected
            : i18n.connect}
        </Button>

        <p className={errorClasses}>{i18n.error}</p>
      </div>
    )
  }
}
