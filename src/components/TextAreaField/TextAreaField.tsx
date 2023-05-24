import * as React from 'react'
import TextArea, {
  TextAreaProps
} from 'semantic-ui-react/dist/commonjs/addons/TextArea/TextArea'
import './TextAreaField.css'

export type TextAreaFieldProps = TextAreaProps & {
  label?: string
  maxLength?: number
}

function getValueLength(value: TextAreaFieldProps['value']) {
  if (value === undefined) {
    return 0
  }
  return typeof value === 'string' ? value.length : value.toString().length
}

export const TextAreaField = (props: TextAreaFieldProps): JSX.Element => {
  const textAreaProps = { ...props }
  delete textAreaProps['label']

  return (
    <div className="dcl text-area">
      {props.label || props.maxLength !== undefined ? (
        <div className="title">
          {props.label ? <label>{props.label}</label> : null}
          {props.maxLength ? (
            <span className="maxLength">
              {getValueLength(props.value)}/{props.maxLength}
            </span>
          ) : null}
        </div>
      ) : null}

      <TextArea {...textAreaProps} />
    </div>
  )
}
