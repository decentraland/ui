import * as React from 'react'
import { Close } from '../Close/Close'
import { Props, ToastType } from './Toast.types'
import './Toast.css'

export class Toast extends React.PureComponent<Props> {
  closeTimeoutId: number | null = null

  handleClose = () => {
    this.props.onClose()
    this.closeTimeoutId = null
  }

  componentDidMount() {
    const { timeout } = this.props
    if (timeout !== undefined && this.closeTimeoutId !== null) {
      this.closeTimeoutId = window.setTimeout(this.handleClose, timeout)
    }
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
