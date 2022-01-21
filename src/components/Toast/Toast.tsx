import * as React from 'react'
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
    const { type = ToastType.INFO, title, body, closable } = this.props
    return (
      <div className={`dcl toast ${type.toLowerCase()}`}>
        {closable ? <Close small onClick={this.handleClose} /> : null}
        <div className="title">{title}</div>
        <div className="body">{body}</div>
      </div>
    )
  }
}
