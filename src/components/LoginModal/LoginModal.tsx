import * as React from 'react'
import { ModalContent } from 'semantic-ui-react'
import { Modal } from '../..'
import { ModalNavigation } from '../ModalNavigation/ModalNavigation'
import './LoginModal.css'

export enum LoginModalOptionType {
  METAMASK = 'metamask',
  DAPPER = 'dapper',
  FORTMATIC = 'fortmatic',
  WALLET_CONNECT = 'wallet-connect'
}

export type LoginModalProps = {
  className?: string
  open?: boolean
  title?: string
  subtitle?: string
  i18n?: LoginModalI18N
  onClose?: () => void
}

export type LoginModalOptionProps = {
  type: LoginModalOptionType
  title?: string
  subtitle?: string
  i18n?: LoginModalOptionI18N
  onClick?: () => void
}

export type LoginModalI18N = {
  title: string
  subtitle: string
}

export type LoginModalOptionI18N = {
  browser_extension: string
  email: string
  mobile: string
}

class LoginModalOption extends React.PureComponent<LoginModalOptionProps> {
  static defaultProps = {
    i18n: {
      browser_extension: 'Using a browser extension',
      email: 'Using you email',
      mobile: 'Using your mobile wallet'
    }
  }

  render() {
    const { type, title, subtitle, onClick, i18n } = this.props

    let defaultTitle = ''
    let defaultSubtitle = ''
    switch (type) {
      case LoginModalOptionType.METAMASK:
        defaultTitle = 'MetaMask'
        defaultSubtitle = i18n.browser_extension
        break
      case LoginModalOptionType.DAPPER:
        defaultTitle = 'Dapper'
        defaultSubtitle = i18n.browser_extension
        break

      case LoginModalOptionType.FORTMATIC:
        defaultTitle = 'Fortmatic'
        defaultSubtitle = i18n.email
        break
      case LoginModalOptionType.WALLET_CONNECT:
        defaultTitle = 'WalletConnect'
        defaultSubtitle = i18n.mobile
        break
    }

    return (
      <div className={`dcl option ${type}`} onClick={onClick}>
        <div className="image" />
        <div className="info">
          <div className="title">{title || defaultTitle}</div>
          <div className="subtitle">{subtitle || defaultSubtitle}</div>
        </div>
      </div>
    )
  }
}

export class LoginModal extends React.Component<LoginModalProps> {
  static defaultProps = {
    className: '',
    i18n: {
      title: 'Sign In',
      subtitle: 'Choose a method to connect'
    }
  }

  static Option = LoginModalOption

  render() {
    const { open, title, subtitle, className, onClose, children } = this.props
    return (
      <Modal open={open} className={`dcl login-modal ${className}`.trim()}>
        <ModalNavigation title={title} subtitle={subtitle} onClose={onClose} />
        <ModalContent>{children}</ModalContent>
      </Modal>
    )
  }
}
