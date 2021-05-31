import * as React from 'react'
import { Close } from '../Close/Close'
import { Props, ToastType } from './Toast.types'
import './Toast.css'

export class Toast extends React.PureComponent<Props> {
  mounted: boolean = false
  closeTimeoutId: number | null = null

  componentDidMount() {
    this.mounted = true

    if (this.shouldCloseAfterTimeout()) {
      this.closeAfterTimeout()
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  handleClose = () => {
    this.props.onClose()
  }

  closeAfterTimeout() {
    const { timeout } = this.props

    this.closeTimeoutId = window.setTimeout(() => {
      if (this.mounted) {
        this.handleClose()
      }
      this.closeTimeoutId = null
    }, timeout)
  }

  shouldCloseAfterTimeout(): boolean {
    const { timeout } = this.props
    return timeout !== undefined && this.closeTimeoutId !== null
  }

  render() {
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
