import * as React from 'react'
import ModalContent from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalContent'
import { Modal } from '../Modal/Modal'
import { ModalNavigation } from '../ModalNavigation/ModalNavigation'
import { Loader } from '../Loader/Loader'
import './LoginModal.css'

export enum LoginModalOptionType {
  METAMASK = 'metamask',
  DAPPER = 'dapper',
  FORTMATIC = 'fortmatic',
  COINBASE = 'coinbase',
  SAMSUNG = 'samsung-blockchain-wallet',
  WALLET_CONNECT = 'wallet-connect',
  WALLET_LINK = 'wallet-link'
}

export type LoginModalProps = {
  className?: string
  message?: React.ReactNode
  hasError?: boolean
  open?: boolean
  loading?: boolean
  i18n?: LoginModalI18N
  onClose?: () => void
}

export type LoginModalOptionProps = {
  type: LoginModalOptionType
  i18n?: LoginModalOptionI18N
  onClick?: () => void
}

export type LoginModalI18N = {
  title: React.ReactNode
  subtitle: React.ReactNode
  error: React.ReactNode
}

export type LoginModalOptionI18N = {
  browser_extension: React.ReactNode
  email: React.ReactNode
  mobile: React.ReactNode
  mobile_and_browser: React.ReactNode
}

class LoginModalOption extends React.PureComponent<LoginModalOptionProps> {
  static defaultProps = {
    i18n: {
      browser_extension: 'Using a browser extension',
      email: 'Using your email',
      mobile: 'Using your mobile wallet',
      mobile_and_browser: 'Using your mobile or browser extension'
    }
  }

  render(): JSX.Element {
    const { type, onClick, i18n } = this.props

    let title: React.ReactNode = ''
    let subtitle: React.ReactNode = ''
    switch (type) {
      case LoginModalOptionType.METAMASK:
        title = 'MetaMask'
        subtitle = i18n.browser_extension
        break

      case LoginModalOptionType.DAPPER:
        title = 'Dapper'
        subtitle = i18n.browser_extension
        break

      case LoginModalOptionType.COINBASE:
        title = 'Coinbase'
        subtitle = i18n.browser_extension
        break

      case LoginModalOptionType.FORTMATIC:
        title = 'Fortmatic'
        subtitle = i18n.email
        break

      case LoginModalOptionType.SAMSUNG:
        title = 'Samsung Blockchain Wallet'
        subtitle = i18n.mobile
        break

      case LoginModalOptionType.WALLET_CONNECT:
        title = 'WalletConnect'
        subtitle = i18n.mobile
        break

      case LoginModalOptionType.WALLET_LINK:
        title = 'Coinbase Wallet'
        subtitle = i18n.mobile_and_browser
        break
    }

    return (
      <div className={`dcl option ${type}`} onClick={onClick}>
        <div className="image" />
        <div className="info">
          <div className="title">{title}</div>
          <div className="subtitle">{subtitle}</div>
        </div>
      </div>
    )
  }
}

export class LoginModal extends React.Component<LoginModalProps> {
  static defaultProps = {
    className: '',
    hasError: false,
    loading: false,
    i18n: {
      title: 'Sign In',
      subtitle: 'Choose a method to connect',
      message: '',
      error: 'Could not connect wallet'
    }
  }

  static Option = LoginModalOption

  render(): JSX.Element {
    const {
      open,
      className,
      message,
      hasError,
      loading,
      onClose,
      i18n,
      children
    } = this.props

    let errorClasses = 'error'
    if (hasError) {
      errorClasses += ' visible'
    }

    return (
      <Modal open={open} className={`dcl login-modal ${className}`.trim()}>
        <ModalNavigation
          title={i18n.title}
          subtitle={i18n.subtitle}
          onClose={onClose}
        />
        <ModalContent>
          {children}
          {message ? <small className="message">{message}</small> : null}
        </ModalContent>
        {hasError ? <p className={errorClasses}>{i18n.error}</p> : null}
        {loading ? (
          <>
            <Loader size="big" active />
            <div className="loader-background"></div>
          </>
        ) : null}
      </Modal>
    )
  }
}
