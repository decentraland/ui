import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Icon } from '../..'

storiesOf('Button', module)
  .add('Primary', () => (
    <>
      <Button primary>Vote Now</Button>
      <Button primary disabled>
        Vote Now
      </Button>
    </>
  ))
  .add('Secondary', () => (
    <>
      <Button>Cancel</Button>
      <Button disabled>Cancel</Button>
    </>
  ))
  .add('Basic', () => (
    <>
      <Button basic>Download</Button>
      <Button basic disabled>
        Download
      </Button>
    </>
  ))
  .add('Icon', () => (
    <>
      <Button basic>
        <Icon name="edit" />Edit
      </Button>
      <Button basic disabled>
        <Icon name="edit" />Edit
      </Button>
    </>
  ))
  .add('Sizes', () => (
    <>
      <Button primary size="massive">
        Massive
      </Button>
      <Button primary size="huge">
        Huge
      </Button>
      <Button primary size="large">
        Large
      </Button>
      <Button primary size="medium">
        Medium
      </Button>
      <Button primary size="small">
        Small
      </Button>
      <Button primary size="tiny">
        Tiny
      </Button>
      <Button primary size="mini">
        Mini
      </Button>
    </>
  ))
  .add('Actions', () => (
    <>
      <Button primary style={{ minWidth: 190 }}>
        Vote Now
      </Button>
      <Button style={{ minWidth: 190 }}>Cancel</Button>
    </>
  ))
