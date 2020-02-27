import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Button } from '../Button/Button'
import { Parallax } from '../Parallax/Parallax'

import { Hero } from './Hero'
import './Hero.stories.css'

storiesOf('Hero', module)
  .addDecorator(centered)
  .add('Text only', () => (
    <div className="story">
      <Hero centered>
        <Hero.Header>Help us build Decentraland</Hero.Header>
        <Hero.Description>Join the discussion</Hero.Description>
      </Hero>
    </div>
  ))
  .add('Left alignment', () => (
    <div className="story">
      <Hero>
        <Hero.Header>Help us build Decentraland</Hero.Header>
        <Hero.Description>Join the discussion</Hero.Description>
      </Hero>
    </div>
  ))
  .add('With content', () => (
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
  ))

  .add('With actions', () => (
    <div className="story">
      <Hero centered>
        <Hero.Header>Help us build Decentraland</Hero.Header>
        <Hero.Description>Join the discussion</Hero.Description>
        <Hero.Actions>
          <Button primary>Do Something</Button>
        </Hero.Actions>
      </Hero>
    </div>
  ))
