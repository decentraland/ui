import * as React from 'react'
import './CustomComponent.css'

export class CustomComponent extends React.Component<{ name: string }, {}> {
  render() {
    const { name } = this.props
    return <div className="dcl custom">{name}</div>
  }
}
