import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Close } from '../Close/Close'
import { Row } from '../Row/Row'

import { Popup } from './Popup'
import './Popup.stories.css'

storiesOf('Popup', module)
  .addDecorator(centered)
  .add('On hover', () => (
    <span>
      If you want to see it&nbsp;
      <Popup
        content="Hello"
        position="top center"
        trigger={<b>hover me</b>}
        on="hover"
      />
      .
    </span>
  ))
  .add('On click', () => (
    <span>
      If you want to see it&nbsp;
      <Popup
        content="Hello"
        position="top center"
        trigger={<b>click me</b>}
        on="click"
      />
      .
    </span>
  ))
  .add('Positions', () => (
    <>
      <div className="Popup-story-row">
        <Popup
          content="Hello"
          position="top left"
          trigger={<b>Top Left</b>}
          on="hover"
        />
        <Popup
          content="Hello"
          position="top center"
          trigger={<b>Top Center</b>}
          on="hover"
        />
        <Popup
          content="Hello"
          position="top right"
          trigger={<b>Top Right</b>}
          on="hover"
        />
      </div>
      <div className="Popup-story-row">
        <Popup
          content="Hello"
          position="bottom left"
          trigger={<b>Bottom Left</b>}
          on="hover"
        />
        <Popup
          content="Hello"
          position="bottom center"
          trigger={<b>Bottom Center</b>}
          on="hover"
        />
        <Popup
          content="Hello"
          position="bottom right"
          trigger={<b>Bottom Right</b>}
          on="hover"
        />
      </div>
    </>
  ))
  .add('Closable', () => (
    <Popup
      open
      content={
        <Row>
          Dismiss me
          <Close small />
        </Row>
      }
      position="top left"
      trigger={<b>Hello there</b>}
      on="hover"
    />
  ))
