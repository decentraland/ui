import * as React from 'react'

import { storiesOf } from '@storybook/react'
import LoadingText from './LoadingText'

import './LoadingText.stories.css'

storiesOf('LoadingText', module)
  .add('h1 small', () => (
    <div className="loading-container">
      <LoadingText type="h1" size="small" />
    </div>
  ))
  .add('h2 medium', () => (
    <div className="loading-container">
      <LoadingText type="h2" size="medium" />
    </div>
  ))
  .add('h3 large', () => (
    <div className="loading-container">
      <LoadingText type="h3" size="large" />
    </div>
  ))
  .add('span full', () => (
    <div className="loading-container">
      <LoadingText type="span" size="full" />
    </div>
  ))
  .add('p full 2 lines', () => (
    <div className="loading-container">
      <LoadingText type="p" size="full" lines={2} />
    </div>
  ))
