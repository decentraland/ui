import React from 'react'
import { Button, Modal, MultiStep} from '../../index'
import {
  Props
} from './AuthorizationModal.types'
import './AuthorizationModal.css'

export function AuthorizationModal({
  currentStep,
  header,
  steps,
  onClose,
}: Props) {
  return (
    <Modal
      open
      className="authorization-modal"
      onClose={onClose}
      data-testid="authorization-modal"
    >
      <Button
        basic
        aria-label={close}
        className="close-button"
        onClick={onClose}
      />
      <h1 className="header">
        {header}
      </h1>
      <MultiStep currentStep={currentStep} steps={steps} />
    </Modal>
  )
}
