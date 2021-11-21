import * as React from 'react'
import Input, {
  InputProps
} from 'semantic-ui-react/dist/commonjs/elements/Input/Input'
import { Blockie } from '../Blockie/Blockie'
import { Button } from '../Button/Button'
import { Header } from '../Header/Header'
import './Field.css'

export type FieldProps = InputProps & {
  label?: string
  error?: boolean
  message?: string
  action?: string
  onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export class Field extends React.PureComponent<FieldProps> {
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
      ...rest
    } = this.props
    const isAddress = this.isAddress()
    let classes = 'dcl field'
    let icon

    if (error) {
      classes += ' error'
      if (!isAddress) {
        icon = 'warning circle'
      }
    }
    if (isAddress) {
      classes += ' address'
    }
    if (disabled) {
      classes += ' disabled'
    }
    if (label) {
      classes += ' has-label'
    }

    if (isAddress && action) {
      console.warn(
        `The address fields don't support actions, "${action}" will be ignored`
      )
    }

    return (
      <div className={classes}>
        {label ? <Header sub>{label}</Header> : null}
        <Input
          value={value}
          type={isAddress ? 'text' : type}
          icon={icon ? icon : void 0}
          loading={loading && !isAddress}
          disabled={disabled}
          {...rest}
        />
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
