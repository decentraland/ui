import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'

import { Button } from './Button'
import './Button.stories.css'
import { Row } from '../Row/Row'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>
export const Primary: Story = {
  render: () => (
    <Row>
      <Button primary>Vote Now</Button>
      <Button primary disabled>
        Vote Now
      </Button>
    </Row>
  ),
}

export const Secondary: Story = {
  render: () => (
    <Row>
      <Button>Cancel</Button>
      <Button disabled>Cancel</Button>
    </Row>
  ),
}

export const Basic: Story = {
  render: () => (
    <Row>
      <Button basic>Download</Button>
      <Button basic disabled>
        Download
      </Button>
    </Row>
  ),
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
  ),
}

export const Link: Story = {
  render: () => (
    <>
      <Button href="https://google.com" primary>
        google.com
      </Button>
    </>
  ),
}

export const IconStory: Story = {
  render: () => (
    <>
      <Button basic>
        <Icon name="edit" />
        Edit
      </Button>
    </>
  ),
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
        <Button size="large">Really Long Label</Button>
        <Button size="large">Min Width</Button>
        <Button disabled size="large">
          Disabled
        </Button>
      </Row>
      <Row className="button-story-row">
        <Button primary>Really Long Label</Button>
        <Button primary>Min Width</Button>
        <Button primary disabled>
          Disabled
        </Button>
      </Row>
      <Row className="button-story-row">
        <Button>Really Long Label</Button>
        <Button>Min Width</Button>
        <Button disabled>Disabled</Button>
      </Row>
      <Row className="button-story-row">
        <Button primary size="small">
          Really Long Label
        </Button>
        <Button primary size="small">
          Min Width
        </Button>
        <Button primary disabled size="small">
          Disabled
        </Button>
      </Row>
      <Row className="button-story-row">
        <Button size="small">Really Long Label</Button>
        <Button size="small">Min Width</Button>
        <Button disabled size="small">
          Disabled
        </Button>
      </Row>
      <Row className="button-story-row">
        <Button primary size="tiny">
          Really Long Label
        </Button>
        <Button primary size="tiny">
          Min Width
        </Button>
        <Button primary disabled size="tiny">
          Disabled
        </Button>
      </Row>
      <Row className="button-story-row">
        <Button size="tiny">Really Long Label</Button>
        <Button size="tiny">Min Width</Button>
        <Button disabled size="tiny">
          Disabled
        </Button>
      </Row>
    </>
  ),
}

export const Actions: Story = {
  render: () => (
    <Row>
      <Button primary style={{ minWidth: 190 }}>
        Vote Now
      </Button>
      <Button style={{ minWidth: 190 }}>Cancel</Button>
    </Row>
  ),
}
