import * as React from 'react'
import './Close.css'

export type CloseProps = {
  small?: boolean
  onClick?: (event: React.MouseEvent<HTMLElement>) => unknown
}

export class Close extends React.PureComponent<CloseProps> {
  static defaultProps: CloseProps = {
    onClick: () => undefined
  }

  render(): JSX.Element {
    const { small, onClick } = this.props

    return (
      <div className={`dcl close ${small ? 'small' : ''}`} onClick={onClick}>
        <div className="close-icon" />
      </div>
    )
  }
}
