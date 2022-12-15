import React from 'react'
import {
  default as DropdownSemantic,
  DropdownProps
} from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown'
import { Icon } from '../..'
import { Mobile, NotMobile } from '../Media'
import './Dropdown.css'

export type DropdownPropsAndTitle = DropdownProps & {
  title: string
}
export class Dropdown extends DropdownSemantic {
  constructor(props: DropdownProps) {
    super(props)
  }

  renderHeader = () => {
    return (
      <div className="headerContainer">
        {this.props.title}
        <Icon name="close" className="closeIcon" />
      </div>
    )
  }

  render() {
    return (
      <>
        <Mobile>
          <DropdownSemantic {...this.props} header={this.renderHeader()} />
        </Mobile>
        <NotMobile>
          <DropdownSemantic {...this.props} />
        </NotMobile>
      </>
    )
  }
}

export { DropdownProps } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown'
