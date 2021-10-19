import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { TextAreaField } from './TextAreaField'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form'

const textAreaValue =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" +
  ', when an unknown printer took a galley of type and scrambled'

storiesOf('TextArea', module)
  .addDecorator(centered)
  .add('Text area without label', () => (
    <TextAreaField value={textAreaValue} rows="10" cols="50" />
  ))
  .add('Text area without label in form', () => (
    <Form>
      <TextAreaField value={textAreaValue} rows="10" cols="50" />
    </Form>
  ))
  .add('Text area with label', () => (
    <TextAreaField
      value={textAreaValue}
      label="Description"
      rows="10"
      cols="50"
    />
  ))
  .add('Text area with label in form', () => (
    <Form>
      <TextAreaField
        value={textAreaValue}
        label="Description"
        rows="10"
        cols="50"
      />
    </Form>
  ))
