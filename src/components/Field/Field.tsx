import * as React from 'react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css'

import Input, {
  InputOnChangeData,
  InputProps
} from 'semantic-ui-react/dist/commonjs/elements/Input/Input'
import classnames from 'classnames'
import { Blockie } from '../Blockie/Blockie'
import { Button } from '../Button/Button'
import { Header } from '../Header/Header'
import './Field.css'

const DATE_TYPE = 'date'
export const INPUT_FORMAT = 'dd-MM-yyyy'

export type FieldProps = InputProps & {
  label?: string
  error?: boolean
  message?: string
  action?: string
  onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void
  kind?: 'simple' | 'full'
  fitContent?: boolean
}

export class Field extends React.PureComponent<FieldProps> {
  static defaultProps = {
    kind: 'simple',
    fitContent: false
  }

  hasAction(): boolean {
    const { loading, error, action } = this.props
    const hasOnAction =
      this.props.onAction !== null && this.props.onAction !== undefined
    return !this.isAddress() && !loading && !error && action && hasOnAction
  }

  isAddress(): boolean {
    const { type } = this.props
    return type === 'address'
  }

  onChangeDatePicker = (e, data) => {
    const year: string = data.value && data.value.getFullYear()
    // Added 0 to dates to match format. e.g. 9-10-2000 -> 09-10-2000
    const day =
      data.value &&
      `${data.value.getDate() < 10 ? '0' : ''}${data.value.getDate()}`
    const month =
      data.value &&
      `${data.value.getMonth() + 1 < 10 ? '0' : ''}${data.value.getMonth() + 1}`

    const newDateFormatted = `${year}-${month}-${day}`
    const inputProps: InputOnChangeData = {
      value: newDateFormatted
    }
    this.props.onChange && this.props.onChange(e, inputProps)
  }

  render(): JSX.Element {
    const {
      value,
      label,
      error,
      message,
      type,
      loading,
      action,
      onAction,
      disabled,
      kind,
      fitContent,
      ...rest
    } = this.props

    const isAddress = this.isAddress()
    const icon = error && !isAddress ? 'warning circle' : void 0
    const classes = classnames('dcl field', kind, {
      error,
      disabled,
      address: isAddress,
      resizable: fitContent,
      ['has-label']: label
    })

    if (isAddress && action) {
      console.warn(
        `The address fields don't support actions, "${action}" will be ignored`
      )
    }

    return (
      <div className={classes}>
        {label ? <Header sub>{label}</Header> : null}
        {type === DATE_TYPE ? (
          <SemanticDatepicker
            value={value && new Date(`${value} 00:00:00`)}
            icon={icon ? icon : void 0}
            loading={loading && !isAddress}
            disabled={disabled}
            showOutsideDays
            className="datePickerWidth"
            {...rest}
            onChange={this.onChangeDatePicker}
          />
        ) : (
          <Input
            value={value}
            type={isAddress ? 'text' : type}
            icon={icon}
            loading={loading && !isAddress}
            disabled={disabled}
            {...rest}
          />
        )}
        {this.hasAction() && (
          <div className="overlay">
            <Button onClick={onAction} disabled={disabled} basic>
              {action}
            </Button>
          </div>
        )}
        {this.isAddress() && value ? <Blockie seed={value} scale={4} /> : null}
        <p className="message">
          {message}
          &nbsp;
        </p>
      </div>
    )
  }
}
