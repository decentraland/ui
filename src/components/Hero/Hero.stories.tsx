import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Parallax } from '../Parallax/Parallax'
import { Hero } from '../..'
import './Hero.stories.css'

storiesOf('Hero', module)
  .add('Text only', () => (
    <div className="story">
      <Hero title="Help us build Decentraland" subtitle="Join the discussion" />
    </div>
  ))
  .add('With content', () => (
    <div className="story">
      <Hero title="Help us build Decentraland" subtitle="Join the discussion">
        <Parallax>
          <Parallax.Layer depth={0.3}>
            <div className="hero-pyramid small" />
          </Parallax.Layer>
          <Parallax.Layer depth={1.5}>
            <div className="hero-pyramid large" />
          </Parallax.Layer>
        </Parallax>
      </Hero>
    </div>
  ))
