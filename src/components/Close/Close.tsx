import * as React from 'react'
import './Close.css'

export type CloseProps = {
  small?: boolean
  onClick?: (event: React.MouseEvent<HTMLElement>) => any
}

export class Close extends React.PureComponent<CloseProps> {
  static defaultProps: CloseProps = {
    onClick: (_: React.MouseEvent<HTMLElement>) => {
      /* noop */
    }
  }

  render() {
    const { small, onClick } = this.props

    return (
      <div className={`dcl close ${small ? 'small' : ''}`} onClick={onClick}>
        <div className="close-icon" />
      </div>
    )
  }
}
