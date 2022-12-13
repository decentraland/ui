import * as React from 'react'
import ModalContent from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalContent'
import classNames from 'classnames'
import FeedbackStarts from '../../assets/feedback-stars.svg'
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
  onClickCta?: () => void
  onClose?: () => void
  onInfo?: () => void
}

export type FeedbackModalI18N = {
  title: React.ReactNode
  description: React.ReactNode
  cta: React.ReactNode
  error: React.ReactNode
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
      error: 'Could not process the transaction'
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
          <img src={FeedbackStarts} className="stars" />
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
          <Button primary onClose={onClickCta || onClose}>
            {i18n.cta}
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
