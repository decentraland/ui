import * as React from 'react'
import { Box } from '../Box/Box'
import './ToggleBox.css'

export type ToggleBoxItem = {
  title: string
  description: string
  active?: boolean
  disabled?: boolean
}

export type ToggleBoxProps = {
  header: string
  className?: string
  items: ToggleBoxItem[]
  onClick?: (
    event: React.MouseEvent<HTMLDivElement>,
    data: ToggleBoxItem
  ) => void
}

export class ToggleBox extends React.PureComponent<ToggleBoxProps> {
  render(): JSX.Element {
    const { header, className, items, onClick } = this.props

    const classes = ['dcl', 'togglebox-item']
    if (className) {
      classes.push(className)
    }

    return (
      <Box header={header} className={className}>
        {items.map((item, index) => {
          const classesItem = [...classes]
          if (item.active) {
            classesItem.push('active')
          }
          if (item.disabled) {
            classesItem.push('disabled')
          }
          return (
            <div
              key={index}
              className={classesItem.join(' ')}
              onClick={(event) => !item.disabled && onClick(event, item)}
            >
              <div className={'dcl togglebox-item-title'}>{item.title}</div>
              <div className={'dcl togglebox-item-description'}>
                {item.description}
              </div>
            </div>
          )
        })}
      </Box>
    )
  }
}
