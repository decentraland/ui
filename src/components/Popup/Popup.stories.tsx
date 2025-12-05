import type { Meta, StoryObj } from '@storybook/react'
import { Close } from '../Close/Close'
import { Row } from '../Row/Row'

import { Popup } from './Popup'
import './Popup.stories.css'

const meta: Meta<typeof Popup> = {
  title: 'Popup',
  component: Popup,
}

export default meta
type Story = StoryObj<typeof Popup>

export const OnHover: Story = {
  render: () => (
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
  ),
}

export const OnClick: Story = {
  render: () => (
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
  ),
}

export const Positions: Story = {
  render: () => (
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
      <div className="Popup-story-row">
        <Popup
          content="Hello"
          position="left center"
          trigger={<b>Left Center</b>}
          on="hover"
        />
        <Popup
          content="Hello"
          position="right center"
          trigger={<b>Right Center</b>}
          on="hover"
        />
      </div>
    </>
  ),
}

export const Closable: Story = {
  render: () => (
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
  ),
}
