import * as React from 'react'
import { Header } from '../Header/Header'
import './Stats.css'

export type StatsProps = {
  title: string
  className?: string
}

export class Stats extends React.Component<StatsProps> {
  static defaultProps = {
    className: ''
  }
  render(): JSX.Element {
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
