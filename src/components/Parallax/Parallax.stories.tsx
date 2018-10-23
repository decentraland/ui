import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Parallax } from '../..'
import './Parallax.stories.css'

storiesOf('Parallax', module).add('Pyramids', () => (
  <div className="story">
    <Parallax>
      <Parallax.Layer depth={2}>
        <div className="pyramid small" />
      </Parallax.Layer>
      <Parallax.Layer depth={4}>
        <div className="pyramid large" />
      </Parallax.Layer>
    </Parallax>
  </div>
))
