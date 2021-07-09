import * as React from 'react'
import './Badge.css'

export type BadgeProps = {
  color: string
  className?: string
  children: React.ReactNode
}

export const Badge = (props: BadgeProps): JSX.Element => {
  const { color, className, children } = props

  const classes = ['dcl', 'badge']
  if (className) {
    classes.push(className)
  }

  return (
    <div className={classes.join(' ')} style={{ backgroundColor: color }}>
      {children}
    </div>
  )
}
