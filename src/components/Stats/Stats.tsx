import * as React from 'react'
import './Stats.css'
import { Header } from 'semantic-ui-react'

type Props = {
  title: string
  className?: string
}

export class Stats extends React.Component<Props> {
  static defaultProps = {
    className: ''
  }
  render() {
    const { title, className, children } = this.props
    const classes = `dcl stats ${className}`.trim()
    return (
      <span className={classes}>
        <Header sub>{title}</Header>
        {typeof children === 'string' ? <Header>{children}</Header> : children}
      </span>
    )
  }
}
