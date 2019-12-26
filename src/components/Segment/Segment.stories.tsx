import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Field } from '../Field/Field'
import { Header } from '../Header/Header'
import { HeaderMenu } from '../HeaderMenu/HeaderMenu'
import { Button } from '../Button/Button'
import { Radio } from '../Radio/Radio'

import { Segment } from './Segment'
import './Segment.stories.css'

storiesOf('Segment', module)
  .addDecorator(centered)
  .add('Single segment', () => (
    <Segment style={{ width: 400 }}>
      <Header>Decentraland</Header>
      <p className="secondary-text">A virtual world built on open standards</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </Segment>
  ))
  .add('With field', () => (
    <Segment style={{ width: 800 }}>
      <HeaderMenu>
        <HeaderMenu.Left>
          <Header>Invite new user</Header>
        </HeaderMenu.Left>
        <HeaderMenu.Right>
          <Header sub>1 Invite Left </Header>
        </HeaderMenu.Right>
      </HeaderMenu>
      <Field
        label="Address"
        placeholder="0x..."
        type="address"
        value="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
      />
      <Button primary>Invite</Button>
    </Segment>
  ))
  .add('With field disabled', () => (
    <Segment style={{ width: 800 }}>
      <HeaderMenu>
        <HeaderMenu.Left>
          <Header>Invite new user</Header>
        </HeaderMenu.Left>
        <HeaderMenu.Right>
          <Header sub>0 Invite Left </Header>
        </HeaderMenu.Right>
      </HeaderMenu>
      <Field label="Address" placeholder="0x..." type="address" disabled />
      <Button primary disabled>
        Invite
      </Button>
      <span style={{ marginLeft: 20, color: 'var(--secondary-text)' }}>
        You don't have any invites left.
      </span>
    </Segment>
  ))
  .add('With radios', () => (
    <Segment style={{ width: 800 }}>
      <Header>Authorizations</Header>
      <div className="Segment-radio-row">
        <Radio
          checked
          label="Authorize marketplace to operate MANA on my behalf"
        />
      </div>
      <div className="Segment-radio-row">
        <Radio label="Authorize marketplace to operate LAND on my behalf" />
      </div>
      <div className="Segment-radio-row">
        <Radio label="Authorize marketplace to operate Estates on my behalf" />
      </div>
    </Segment>
  ))
  .add('With buttons', () => (
    <Segment style={{ width: 800 }}>
      <Header>Some buttons</Header>
      <Button>Hello</Button>
      <Button disabled>Disabled</Button>
    </Segment>
  ))
