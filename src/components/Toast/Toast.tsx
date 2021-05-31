import * as React from 'react'
import { Close } from '../Close/Close'
import { Props, ToastType } from './Toast.types'
import './Toast.css'

export class Toast extends React.PureComponent<Props> {
  isMounted: boolean = false
  closeTimeoutId: number | null = null

  componentDidMount() {
    this.isMounted = true

    if (this.shouldCloseAfterTimeout()) {
      this.closeAfterTimeout()
    }
  }

  componentWillUnmount() {
    this.isMounted = false
  }

  handleClose = () => {
    this.props.onClose()
  }

  closeAfterTimeout() {
    const { timeout } = this.props

    this.closeTimeoutId = window.setTimeout(() => {
      if (this.isMounted) {
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
      <div className={`Toast ${type.toLowerCase()}`}>
        {closable ? <Close small onClick={this.handleClose} /> : null}
        <div className="title">{title}</div>
        <div className="body">{body}</div>
      </div>
    )
  }
}
