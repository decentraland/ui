import * as React from 'react'
import classNames from 'classnames'
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

    return (
      <Box header={header} className={className}>
        {items.map((item, index) => (
          <div
            key={index}
            className={classNames('dcl togglebox-item', {
              ['active']: !!item.active,
              ['disabled']: !!item.disabled
            })}
            onClick={(event) => !item.disabled && onClick(event, item)}
          >
            <div className={'dcl togglebox-item-title'}>{item.title}</div>
            <div className={'dcl togglebox-item-description'}>
              {item.description}
            </div>
          </div>
        ))}
      </Box>
    )
  }
}
