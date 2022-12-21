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
  onClose?: () => void
  onInfo?: () => void
}

export type FeedbackModalI18N = {
  title: React.ReactNode
  statusDescription?: React.ReactNode
  description: React.ReactNode
  cta: React.ReactNode
  error: React.ReactNode
  viewTransaction: React.ReactNode
  goToText?: React.ReactNode
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
      error: 'Could not process the transaction',
      viewTransaction: 'View Transaction in Exporer'
    }
  }

  renderBanner(): JSX.Element {
    return this.props.status === TransactionStatus.SUCCESS ? (
      <img className="stars" />
    ) : (
      <div className="image" />
    )
  }

  renderActions(): JSX.Element {
    const { i18n, status, goToUrl, transactionUrl, onClickCta, onClose } =
      this.props

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
                <a href={goToUrl} className="go-to">
                  {i18n?.goToText}
                </a>
              ) : null}
            </Loader>
          </>
        )
      case TransactionStatus.FAILURE:
        return (
          <Button primary onClick={onClickCta || onClose}>
            {i18n.cta}
          </Button>
        )
      default:
        break
    }
  }

  render(): JSX.Element {
    const {
      open,
      className,
      message,
      i18n,
      hasError,
      loading,
      selectedNetwork,
      selectedGateway,
      status,
      onClose,
      onInfo
    } = this.props

    return (
      <Modal
        open={open}
        className={classNames('dcl', 'feedback-modal', className, status)}
      >
        <ModalNavigation title={i18n.title} onInfo={onInfo} onClose={onClose} />
        <ModalContent className={classNames(selectedNetwork, selectedGateway)}>
          {this.renderBanner()}
          <div className="text-content">
            {i18n.statusDescription ? (
              <p className="status-description">
                <Icon name="clock outline" className="status-icon" />
                {i18n.statusDescription}
              </p>
            ) : null}
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
