import * as React from 'react'
import { Header, Input, InputProps } from 'semantic-ui-react'
import './Field.css'
import { Blockie } from '../..'

export type FieldProps = InputProps & {
  label?: string
  error?: boolean
  message?: string
}

export class Field extends React.PureComponent<FieldProps> {
  render() {
    let { value, label, error, message, type, loading, ...rest } = this.props
    const isAddress = type === 'address'
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

    return (
      <div className={classes}>
        {label ? <Header sub>{label}</Header> : null}
        <Input
          value={value}
          type={isAddress ? 'text' : type}
          icon={icon}
          loading={loading && !isAddress}
          {...rest as any}
        />
        {isAddress && value ? <Blockie seed={value} scale={4} /> : null}
        <p className="message">{message}&nbsp;</p>
      </div>
    )
  }
}
