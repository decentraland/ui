import * as React from 'react'
import { Header, Dropdown, DropdownProps } from 'semantic-ui-react'
import './SelectField.css'

export type SelectFieldProps = DropdownProps & {
  label?: string
}

export class SelectField extends React.PureComponent<SelectFieldProps> {
  render() {
    const { label, ...rest } = this.props
    const classes = 'dcl select-field'

    return (
      <div className={classes}>
        {label ? <Header sub>{label}</Header> : null}
        <Dropdown search selection {...rest} />
        <p className="message">&nbsp;</p>
      </div>
    )
  }
}
