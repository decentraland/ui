import * as React from 'react'
import TextArea, {
  TextAreaProps
} from 'semantic-ui-react/dist/commonjs/addons/TextArea/TextArea'
import { getInputValueLength } from '../../lib/input'
import './TextAreaField.css'

export type TextAreaFieldProps = TextAreaProps & {
  label?: string
  maxLength?: number
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
              {getInputValueLength(props.value)}/{props.maxLength}
            </span>
          ) : null}
        </div>
      ) : null}

      <TextArea {...textAreaProps} />
    </div>
  )
}
