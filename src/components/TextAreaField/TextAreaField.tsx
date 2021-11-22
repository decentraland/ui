import * as React from 'react'
import TextArea, {
  TextAreaProps
} from 'semantic-ui-react/dist/commonjs/addons/TextArea/TextArea'
import './TextAreaField.css'

export type TextAreaFieldProps = TextAreaProps & { label?: string }

export const TextAreaField = (props: TextAreaFieldProps): JSX.Element => {
  const textAreaProps = { ...props }
  delete textAreaProps['label']

  return (
    <div className="dcl text-area">
      {props.label && <div className="label">{props.label}</div>}
      <TextArea {...textAreaProps} />
    </div>
  )
}
