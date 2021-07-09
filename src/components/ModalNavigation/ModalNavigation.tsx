import * as React from 'react'
import './ModalNavigation.css'

export type ModalNavigationProps = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  onBack?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onClose?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export class ModalNavigation extends React.PureComponent<ModalNavigationProps> {
  render(): JSX.Element {
    const { title, subtitle, onBack, onClose } = this.props
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
