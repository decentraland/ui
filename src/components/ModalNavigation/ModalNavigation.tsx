import * as React from 'react'
import './ModalNavigation.css'

export type ModalNavigationProps = {
  /** The modal's title. */
  title: React.ReactNode
  /**  modal's subtitle, optional */
  subtitle?: React.ReactNode
  /**  ON BACK: on back event, this allows navigation inside modal and renders a button arrow */
  onBack?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  /**  ON CLOSE: on clse event, this allows closing the modal rendering a close button */
  onClose?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  /**  ON INFO: on info event, this renders a clickable question mark */
  onInfo?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export class ModalNavigation extends React.PureComponent<ModalNavigationProps> {
  render(): JSX.Element {
    const { title, subtitle, onBack, onClose, onInfo } = this.props
    return (
      <div className="dcl modal-navigation">
        <div className="dcl modal-navigation-title">{title}</div>
        {subtitle && (
          <div className="dcl modal-navigation-subtitle">{subtitle}</div>
        )}
        {onBack && (
          <div
            className="dcl modal-navigation-button modal-navigation-back"
            onClick={onBack}
          />
        )}
        {onInfo && (
          <div
            className="dcl modal-navigation-button modal-navigation-info"
            onClick={onInfo}
          />
        )}
        {onClose && (
          <div
            className="dcl modal-navigation-button modal-navigation-close"
            onClick={onClose}
          />
        )}
      </div>
    )
  }
}
