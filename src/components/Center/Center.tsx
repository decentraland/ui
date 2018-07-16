import * as React from 'react'
import './Center.css'

export type CenterProps = {
  screen?: boolean
}

export class Center extends React.PureComponent<CenterProps> {
  render() {
    const { screen, children } = this.props
    const classes = `dcl center ${screen ? 'screen' : ''}`.trim()
    return <div className={classes}>{children}</div>
  }
}
