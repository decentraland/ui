import * as React from 'react'
import { Dropdown, DropdownProps } from '../Dropdown/Dropdown'
import { Header } from '../Header/Header'
import './SelectField.css'

export type SelectFieldProps = DropdownProps & {
  label?: string
  header?: JSX.Element
}

export class SelectField extends React.PureComponent<SelectFieldProps> {
  render() {
    const { label, header, options, ...rest } = this.props
    const classes = 'dcl select-field'

    return (
      <div className={classes}>
        {label ? <Header sub>{label}</Header> : null}

        <Dropdown search selection {...rest}>
          <Dropdown.Menu className="wrapper">
            {header}
            <Dropdown.Menu scrolling className="options-wrapper">
              {options.map((opt, i) => (
                <Dropdown.Item
                  key={i}
                  {...opt}
                  onClick={e =>
                    this.props.onChange(e, { ...this.props, value: opt.value })
                  }
                />
              ))}
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
        <p className="message">&nbsp;</p>
      </div>
    )
  }
}
