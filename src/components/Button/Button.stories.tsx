import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from 'semantic-ui-react'
import { Button } from './Button'
import { Row } from '../Row/Row'
import './Button.stories.css'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <Row>
      <Button primary>Download</Button>
      <Button primary disabled>
        Download
      </Button>
    </Row>
  )
}

export const Secondary: Story = {
  render: () => (
    <Row>
      <Button>Cancel</Button>
      <Button disabled>Cancel</Button>
    </Row>
  )
}

export const Basic: Story = {
  render: () => (
    <Row>
      <Button basic>Download</Button>
      <Button basic disabled>
        Download
      </Button>
    </Row>
  )
}

export const Inverted: Story = {
  render: () => (
    <Row>
      <Button inverted>Download</Button>
      <Button inverted disabled>
        Download
      </Button>
      <Button inverted primary>
        Download
      </Button>
      <Button inverted primary disabled>
        Download
      </Button>
    </Row>
  )
}

export const Link: Story = {
  render: () => (
    <>
      <Button href="https://google.com" primary>
        google.com
      </Button>
    </>
  )
}

export const WithIcon: Story = {
  render: () => (
    <>
      <Button basic>
        <Icon name="edit" />
        Edit
      </Button>
    </>
  )
}

export const Sizes: Story = {
  render: () => (
    <>
      <Row className="button-story-row">
        <Button primary size="large">
          Really Long Label
        </Button>
        <Button primary size="large">
          Min Width
        </Button>
        <Button primary disabled size="large">
          Disabled
        </Button>
      </Row>
      <Row className="button-story-row">
        <Button primary>Normal</Button>
        <Button primary disabled>
          Disabled
        </Button>
      </Row>
      <Row className="button-story-row">
        <Button primary size="small">
          Small
        </Button>
        <Button primary size="small" disabled>
          Disabled
        </Button>
      </Row>
    </>
  )
}
