import * as React from 'react'
import './Stats.css'
import { Header } from 'semantic-ui-react'

type Props = {
  title: string
  children: React.ReactNode
}

export class Stats extends React.Component<Props> {
  render() {
    const { title, children } = this.props
    return (
      <span className="dcl stats">
        <Header sub>{title}</Header>
        {typeof children === 'string' ? (
          <Header size="large">{children}</Header>
        ) : (
          children
        )}
      </span>
    )
  }
}
