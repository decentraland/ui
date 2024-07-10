import * as React from 'react'
import classNames from 'classnames'
import { Dropdown, DropdownProps } from '../Dropdown/Dropdown'
import { Header } from '../Header/Header'
import './SelectField.css'

export type SelectFieldProps = DropdownProps & {
  label?: string | JSX.Element
  error?: boolean
  message?: string
  header?: JSX.Element
  border?: boolean
}

export class SelectField extends React.PureComponent<SelectFieldProps> {
  render(): JSX.Element {
    const {
      label,
      header,
      options,
      message,
      error,
      border,
      className,
      ...rest
    } = this.props

    return (
      <div
        className={classNames(
          'dcl',
          'select-field',
          { error: error, warning: error, circle: error, border: border },
          className
        )}
      >
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
