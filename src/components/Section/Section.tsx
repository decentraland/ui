import * as React from 'react'
import './Section.css'

export type SectionProps = {
  className?: string
  size?: 'tiny' | 'small' | 'medium' | 'large'
  children?: React.ReactNode
}

export class Section extends React.PureComponent<SectionProps> {
  static defaultProps: Partial<SectionProps> = {
    size: 'medium'
  }

  render(): JSX.Element {
    const { size, className, children } = this.props
    const classes = ['dcl', 'section', size]
    if (className) {
      classes.push(className)
    }
    return <div className={classes.join(' ')}>{children}</div>
  }
}
