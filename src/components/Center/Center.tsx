import * as React from 'react'
import './Center.css'

type Props = {
  screen?: boolean
}

export class Center extends React.PureComponent<Props> {
  render() {
    const { screen, children } = this.props
    const classes = `dcl center ${screen ? 'screen' : ''}`.trim()
    return <div className={classes}>{children}</div>
  }
}
