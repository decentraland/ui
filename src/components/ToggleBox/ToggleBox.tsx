import * as React from 'react'
import classNames from 'classnames'
import { Box } from '../Box/Box'
import './ToggleBox.css'

export type ToggleBoxItem = {
  title: string
  description: string
  active?: boolean
  disabled?: boolean
  onClick?: (item: ToggleBoxItem, index: number) => unknown
}

export type ToggleBoxProps = {
  header: string
  className?: string
  items: ToggleBoxItem[]
}

export class ToggleBox extends React.PureComponent<ToggleBoxProps> {
  render(): JSX.Element {

    const { header, className, items } = this.props
    
    return (
      <Box header={header} className={className}>
        {items.map((item, index) => (
          <div
            key={index}
            className={classNames("dcl togglebox-item", {
              ["active"]: !!item.active,
              ["disabled"]: !!item.disabled
            })}
            onClick={() => !item.disabled && item.onClick(item, index)}
          >
            <div className={"dcl togglebox-item-title"}>{item.title}</div>
            <div className={"dcl togglebox-item-description"}>{item.description}</div>
          </div>
        ))}
      </Box>
    )
  }
}