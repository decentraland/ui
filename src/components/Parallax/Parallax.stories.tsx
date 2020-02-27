import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'

import { Parallax } from './Parallax'
import './Parallax.stories.css'

storiesOf('Parallax', module)
  .addDecorator(centered)
  .add('Depth', () => (
    <div className="Parallax-story">
      <Parallax>
        <Parallax.Layer depth={2}>
          <div className="square small" />
        </Parallax.Layer>
        <Parallax.Layer depth={8}>
          <div className="square medium" />
        </Parallax.Layer>
        <Parallax.Layer depth={14}>
          <div className="square large" />
        </Parallax.Layer>
      </Parallax>
    </div>
  ))
