import * as React from 'react'
import classNames from 'classnames'
import { Close } from '../Close/Close'
import './Toast.css'

export enum ToastType {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export type ToastProps = {
  type?: ToastType
  title: string | JSX.Element
  body: string | JSX.Element
  closable?: boolean
  timeout?: number
  icon?: JSX.Element
  className?: string
  onClose?: () => void
}

export class Toast extends React.PureComponent<ToastProps> {
  mounted = false
  closeTimeoutId: number | null = null

  componentDidMount(): void {
    this.mounted = true

    if (this.shouldCloseAfterTimeout()) {
      this.closeAfterTimeout()
    }
  }

  componentWillUnmount(): void {
    this.mounted = false
  }

  handleClose = (): void => {
    this.props.onClose && this.props.onClose()
  }

  closeAfterTimeout(): void {
    const { timeout } = this.props

    this.closeTimeoutId = window
      ? window.setTimeout(() => {
          if (this.mounted) {
            this.handleClose()
          }
          this.closeTimeoutId = null
        }, timeout)
      : null
  }

  shouldCloseAfterTimeout(): boolean {
    const { timeout } = this.props
    return timeout !== undefined && this.closeTimeoutId === null
  }

  render(): JSX.Element {
    const {
      type = ToastType.INFO,
      title,
      body,
      closable,
      icon,
      className
    } = this.props
    return (
      <div
        className={classNames('dcl', 'toast', type.toLowerCase(), className)}
      >
        <div className="toast-info">
          {icon && <span className="toast-icon">{icon}</span>}
          <div>
            {closable ? <Close onClick={this.handleClose} /> : null}
            <div className="title">{title}</div>
            <div className="body">{body}</div>
          </div>
        </div>
      </div>
    )
  }
}
