import * as React from 'react'
import './Center.css'

export type CenterProps = {
  screen?: boolean
  className?: string
}

export class Center extends React.PureComponent<CenterProps> {
  render() {
    const { screen, className, children } = this.props
    let style: any = {}
    let classes = `dcl center ${screen ? 'screen' : ''}`.trim()
    if (className) {
      classes += ' ' + className
    }
    return (
      <div className={classes} style={style}>
        {children}
      </div>
    )
  }
}
