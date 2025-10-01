import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button/Button'
import { Parallax } from '../Parallax/Parallax'

import { Hero } from './Hero'
import './Hero.stories.css'

const meta: Meta<typeof Hero> = {
  title: 'Hero',
  component: Hero,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const TextOnly: Story = {
  render: () => (
    <div className="story">
      <Hero centered>
        <Hero.Header>Help us build Decentraland</Hero.Header>
        <Hero.Description>Join the discussion</Hero.Description>
      </Hero>
    </div>
  )
}

export const LeftAlignment: Story = {
  render: () => (
    <div className="story">
      <Hero>
        <Hero.Header>Help us build Decentraland</Hero.Header>
        <Hero.Description>Join the discussion</Hero.Description>
      </Hero>
    </div>
  )
}

export const WithContent: Story = {
  render: () => (
    <div className="story">
      <Hero centered>
        <Hero.Header>Help us build Decentraland</Hero.Header>
        <Hero.Description>Join the discussion</Hero.Description>
        <Hero.Content>
          <Parallax>
            <Parallax.Layer depth={0.3}>
              <div className="hero-pyramid small" />
            </Parallax.Layer>
            <Parallax.Layer depth={1.5}>
              <div className="hero-pyramid large" />
            </Parallax.Layer>
          </Parallax>
        </Hero.Content>
      </Hero>
    </div>
  )
}

export const WithActions: Story = {
  render: () => (
    <div className="story">
      <Hero centered>
        <Hero.Header>Help us build Decentraland</Hero.Header>
        <Hero.Description>Join the discussion</Hero.Description>
        <Hero.Actions>
          <Button primary>Do Something</Button>
        </Hero.Actions>
      </Hero>
    </div>
  )
}
