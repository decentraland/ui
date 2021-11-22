import * as React from 'react'
import { Dropdown, DropdownProps } from '../Dropdown/Dropdown'
import { Header } from '../Header/Header'
import './SelectField.css'

export type SelectFieldProps = DropdownProps & {
  label?: string
  error?: boolean
  message?: string
  header?: JSX.Element
}

export class SelectField extends React.PureComponent<SelectFieldProps> {
  render(): JSX.Element {
    const { label, header, options, message, error, ...rest } = this.props
    let classes = 'dcl select-field'

    if (error) {
      classes += ' error warning circle'
    }

    return (
      <div className={classes}>
        {label ? <Header sub>{label}</Header> : null}

        <Dropdown search selection options={options} {...rest}>
          {header && (
            <Dropdown.Menu className="wrapper">
              <Dropdown.Header content={header} />
              <Dropdown.Menu scrolling className="options-wrapper">
                {options.map((opt, i) => (
                  <Dropdown.Item
                    key={i}
                    {...opt}
                    onClick={(e) =>
                      this.props.onChange(e, {
                        ...this.props,
                        value: opt.value
                      })
                    }
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown.Menu>
          )}
        </Dropdown>
        <p className="message">
          {message}
          &nbsp;
        </p>
      </div>
    )
  }
}
