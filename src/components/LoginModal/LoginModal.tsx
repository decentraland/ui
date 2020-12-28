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
  onClose?: () => void
}

export type LoginModalOptionProps = {
  type: LoginModalOptionType
  title?: string
  subtitle?: string
  onClick?: () => void
}

export class LoginModal extends React.Component<LoginModalProps> {
  static defaultProps = {
    className: '',
    title: 'Sign In',
    subtitle: 'Choose a method to sign in'
  }

  static Option = ({
    type,
    title,
    subtitle,
    onClick
  }: LoginModalOptionProps) => {
    let defaultTitle = ''
    let defaultSubtitle = ''
    switch (type) {
      case LoginModalOptionType.METAMASK:
        title = 'MetaMask'
        subtitle = 'Using a browser extension'
        break
      case LoginModalOptionType.DAPPER:
        title = 'Dapper'
        subtitle = 'Using a browser extension'
        break

      case LoginModalOptionType.FORTMATIC:
        title = 'Fortmatic'
        subtitle = 'Using your email'
        break
      case LoginModalOptionType.WALLET_CONNECT:
        title = 'WalletConnect'
        subtitle = 'Using your mobile wallet'
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
