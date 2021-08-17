import * as React from 'react'
import './Filter.css'

export type FilterProps = {
  active?: boolean
}

export class Filter extends React.PureComponent<FilterProps> {
  render(): JSX.Element {
    const { active, children } = this.props
    return (
      <div className={`dcl filter ${active ? 'active' : ''}`}>
        <div className="filter-background" />
        <span>{children}</span>
      </div>
    )
  }
}
