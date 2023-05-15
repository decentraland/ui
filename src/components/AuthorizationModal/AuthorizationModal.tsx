import React from 'react'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import { MultiStep } from '../MultiStep'
import { Props } from './AuthorizationModal.types'
import './AuthorizationModal.css'

export function AuthorizationModal({
  currentStep,
  header,
  steps,
  onClose
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
        aria-label="Close"
        className="close-button"
        onClick={onClose}
      />
      <h1 className="authorization-header">{header}</h1>
      <MultiStep currentStep={currentStep} steps={steps} />
    </Modal>
  )
}
