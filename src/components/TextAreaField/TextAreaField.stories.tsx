import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { TextAreaField } from './TextAreaField'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form'

const textAreaValue =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" +
  ', when an unknown printer took a galley of type and scrambled'

storiesOf('TextArea', module)
  .add('Placeholder', () => (
    <TextAreaField placeholder={textAreaValue} rows="10" cols="50" />
  ))
  .add('Without label', () => (
    <TextAreaField value={textAreaValue} rows="10" cols="50" />
  ))
  .add('Without label in form', () => (
    <Form>
      <TextAreaField value={textAreaValue} rows="10" cols="50" />
    </Form>
  ))
  .add('With label', () => (
    <TextAreaField
      value={textAreaValue}
      label="Description"
      rows="10"
      cols="50"
    />
  ))
  .add('Without label and max length', () => (
    <TextAreaField maxLength={300} value={textAreaValue} rows="10" cols="50" />
  ))
  .add('With label and max length', () => (
    <TextAreaField
      maxLength={300}
      label="Description"
      value={textAreaValue}
      rows="10"
      cols="50"
    />
  ))
  .add('With label in form', () => (
    <Form>
      <TextAreaField
        value={textAreaValue}
        label="Description"
        rows="10"
        cols="50"
      />
    </Form>
  ))
  .add('With error, warning or info', () => (
    <>
      <TextAreaField
        value={textAreaValue}
        maxLength={300}
        label="Description"
        rows="10"
        cols="50"
        error="An error occurred"
      />
      <br />
      <TextAreaField
        value={textAreaValue}
        maxLength={300}
        label="Description"
        rows="10"
        cols="50"
        warning="There's a warning!"
      />
      <br />
      <TextAreaField
        value={textAreaValue}
        maxLength={300}
        label="Description"
        rows="10"
        cols="50"
        info="This is some information"
      />
      <br />
    </>
  ))
