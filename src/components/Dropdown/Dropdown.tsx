import React from 'react'
import {
  default as DropdownSemantic,
  DropdownProps as DropdownSemanticProps
} from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown'
import { Icon } from '../..'
import { Mobile, NotMobile } from '../Media'
import './Dropdown.css'

export type DropdownProps = DropdownSemanticProps & {
  /* Mobile header title */
  title?: string
}
export class Dropdown extends DropdownSemantic {
  constructor(props: DropdownSemanticProps) {
    super(props)
  }

  renderHeader = () => {
    return (
      <div className="headerContainer">
        {this.props.title}
        <Icon
          name="close"
          className="closeIcon"
          onClick={this.props?.onClose}
        />
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

export { DropdownProps as DropdownPropsSemantic } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown'
