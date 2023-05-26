import * as React from 'react'
import classNames from 'classnames'
import TextArea, {
  TextAreaProps
} from 'semantic-ui-react/dist/commonjs/addons/TextArea/TextArea'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { getInputValueLength } from '../../lib/input'
import './TextAreaField.css'

export type TextAreaFieldProps = TextAreaProps & {
  label?: string
  maxLength?: number
  error?: string
  warning?: string
  info?: string
}

function renderMessage(props: TextAreaFieldProps) {
  const { error, warning, info } = props

  if (error) {
    return (
      <>
        <Icon name="remove circle" /> {error}
      </>
    )
  }

  if (warning) {
    return (
      <>
        <Icon name="warning sign" /> {warning}
      </>
    )
  }

  if (info) {
    return (
      <>
        <Icon name="info circle" /> {info}
      </>
    )
  }
}

export const TextAreaField = (props: TextAreaFieldProps): JSX.Element => {
  const { error, warning, info, ...restOfProps } = props
  delete restOfProps['label']

  return (
    <div
      className={classNames('dcl', 'text-area', {
        error: error,
        warning: !error && warning,
        info: !error && !warning && info
      })}
    >
      {props.label || props.maxLength !== undefined ? (
        <div className="title">
          {props.label ? <label>{props.label}</label> : null}
          {props.maxLength ? (
            <span className="maxLength">
              {getInputValueLength(props.value)}/{props.maxLength}
            </span>
          ) : null}
        </div>
      ) : null}

      <TextArea {...restOfProps} />
      <p className="message">{renderMessage(props)}&nbsp;</p>
    </div>
  )
}
