import * as React from 'react'
import ModalContent from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalContent'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import classNames from 'classnames'
import { Modal } from '../Modal/Modal'
import { ModalNavigation } from '../ModalNavigation/ModalNavigation'
import { Loader } from '../Loader/Loader'
import { Button } from '../Button/Button'
import './FeedbackModal.css'

export type FeedbackModalProps = {
  className?: string
  message?: React.ReactNode
  hasError?: boolean
  open?: boolean
  loading?: boolean
  i18n?: FeedbackModalI18N
  transactionUrl?: string
  onClickCta?: () => void
  onClose?: () => void
  onInfo?: () => void
}

export type FeedbackModalI18N = {
  title: React.ReactNode
  description: React.ReactNode
  cta: React.ReactNode
  error: React.ReactNode
  viewTransaction: React.ReactNode
}

export class FeedbackModal extends React.Component<FeedbackModalProps> {
  static defaultProps = {
    className: '',
    hasError: false,
    loading: false,
    i18n: {
      title: 'Awesome',
      description:
        'You just bought some mana you naughty friend.\nThis copy clearly needs review',
      cta: 'Done',
      error: 'Could not process the transaction',
      viewTransaction: 'View Transaction in Exporer'
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
      transactionUrl,
      onClose,
      onInfo,
      onClickCta
    } = this.props

    return (
      <Modal
        open={open}
        className={classNames('dcl', 'feedback-modal', className)}
      >
        <ModalNavigation title={i18n.title} onInfo={onInfo} onClose={onClose} />
        <ModalContent>
          <img className="stars" />
          <p>{i18n.description}</p>
          {message ? <small className="message">{message}</small> : null}
        </ModalContent>
        {hasError ? <p className="error visible">{i18n.error}</p> : null}
        {loading ? (
          <>
            <Loader size="big" active />
            <div className="loader-background"></div>
          </>
        ) : null}
        <Modal.Actions>
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
        </Modal.Actions>
      </Modal>
    )
  }
}
