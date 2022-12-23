import * as React from 'react'
import ModalContent from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalContent'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import classNames from 'classnames'
import { Network } from '@dcl/schemas'
import { Modal } from '../Modal/Modal'
import { ModalNavigation } from '../ModalNavigation/ModalNavigation'
import { Loader } from '../Loader/Loader'
import { Button } from '../Button/Button'
import { NetworkGatewayType } from './Network'
import './FeedbackModal.css'

export enum TransactionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILURE = 'failure'
}

const iconNames = {
  [TransactionStatus.PENDING]: 'clock outline',
  [TransactionStatus.FAILURE]: 'warning circle'
}

export type FeedbackModalProps = {
  className?: string
  message?: React.ReactNode
  hasError?: boolean
  open?: boolean
  loading?: boolean
  i18n?: FeedbackModalI18N
  transactionUrl?: string
  selectedNetwork?: Network
  selectedGateway?: NetworkGatewayType
  goToUrl?: string
  status: TransactionStatus
  onClickCta?: () => void
  onClickSecondaryCta?: () => void
  onClose?: () => void
  onInfo?: () => void
}

export type FeedbackModalI18N = {
  title: React.ReactNode
  statusTitle?: React.ReactNode
  description: React.ReactNode
  cta?: React.ReactNode
  secondaryCta?: React.ReactNode
  viewTransaction?: React.ReactNode
  goToText?: React.ReactNode
  error?: React.ReactNode
}

export class FeedbackModal extends React.Component<FeedbackModalProps> {
  static defaultProps = {
    className: '',
    hasError: false,
    loading: false,
    i18n: {
      title: 'Awesome',
      description:
        'The MANA has been added to your account. If you still don’t see it in your balance, refresh this page.',
      cta: 'Done',
      viewTransaction: 'View Transaction in Exporer'
    }
  }

  renderActions(): JSX.Element {
    const {
      i18n,
      status,
      goToUrl,
      transactionUrl,
      onClickCta,
      onClickSecondaryCta,
      onClose
    } = this.props

    switch (status) {
      case TransactionStatus.SUCCESS:
        return (
          <>
            <Button primary onClick={onClickCta || onClose}>
              {i18n.cta}
            </Button>
            {transactionUrl ? (
              <a
                className="view-transaction"
                href={transactionUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {i18n.viewTransaction}
                <Icon name="external alternate" />
              </a>
            ) : null}
          </>
        )
      case TransactionStatus.PENDING:
        return (
          <>
            <Loader size="medium" active>
              {goToUrl ? (
                <a
                  href={goToUrl}
                  className="go-to"
                  target="_blank"
                  rel="external"
                >
                  {i18n?.goToText}
                </a>
              ) : null}
            </Loader>
          </>
        )
      case TransactionStatus.FAILURE:
        return (
          <>
            <Button primary onClick={onClickCta}>
              {i18n.cta}
            </Button>
            <Button secondary onClick={onClickSecondaryCta}>
              {i18n.secondaryCta}
            </Button>
          </>
        )
      default:
        break
    }
  }

  renderStatusTitle(): JSX.Element {
    const { i18n, status } = this.props
    const iconName = iconNames[status]

    if (status === TransactionStatus.SUCCESS) return null

    return i18n.statusTitle ? (
      <p className="status-description">
        {iconName ? <Icon name={iconName} className="status-icon" /> : null}
        {i18n.statusTitle}
      </p>
    ) : null
  }

  render(): JSX.Element {
    const {
      open,
      className,
      message,
      i18n,
      hasError,
      loading,
      status,
      selectedGateway,
      onClose,
      onInfo
    } = this.props

    return (
      <Modal
        open={open}
        className={classNames('dcl', 'feedback-modal', className, status)}
      >
        <ModalNavigation title={i18n.title} onInfo={onInfo} onClose={onClose} />
        <ModalContent>
          <img
            className={classNames(
              'gateway-image',
              status === TransactionStatus.SUCCESS ? 'stars' : selectedGateway
            )}
          />
          <div className="text-content">
            {this.renderStatusTitle()}
            <p className="description">{i18n.description}</p>
            {message ? <small className="message">{message}</small> : null}
          </div>
        </ModalContent>
        {hasError ? <p className="error visible">{i18n.error}</p> : null}
        {loading ? (
          <>
            <Loader size="big" active />
            <div className="loader-background"></div>
          </>
        ) : null}
        <Modal.Actions>{this.renderActions()}</Modal.Actions>
      </Modal>
    )
  }
}
