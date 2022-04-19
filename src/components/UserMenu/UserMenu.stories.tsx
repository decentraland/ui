import * as React from 'react'
import { Network } from '@dcl/schemas/dist/dapps/network'
import MenuItem from 'semantic-ui-react/dist/commonjs/collections/Menu/MenuItem'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { UserMenu } from './UserMenu'
import { avatar } from '../../data/avatar'

storiesOf('UserMenu', module)
  .addDecorator(centered)
  .add('Signed out', () => <UserMenu />)
  .add('Signed in', () => <UserMenu isSignedIn avatar={avatar} />)
  .add('Guest', () => <UserMenu isSignedIn />)
  .add('Clickable profile', () => (
    <UserMenu isSignedIn avatar={avatar} onClickProfile={() => undefined} />
  ))
  .add('Sign Out', () => (
    <UserMenu isSignedIn avatar={avatar} onSignOut={() => undefined} />
  ))
  .add('Settings', () => (
    <UserMenu
      isSignedIn
      avatar={avatar}
      onSignOut={() => undefined}
      onClickSettings={() => undefined}
    />
  ))
  .add('Extra actions', () => (
    <UserMenu
      isSignedIn
      avatar={avatar}
      onClickSettings={() => undefined}
      menuItems={
        <>
          <MenuItem>
            <Icon name="users" />
            &nbsp;Friends
          </MenuItem>
        </>
      }
    />
  ))
  .add('Mana', () => (
    <UserMenu
      isSignedIn
      avatar={avatar}
      manaBalances={{ [Network.ETHEREUM]: 1000 }}
    />
  ))
  .add('Mana L2', () => (
    <UserMenu
      isSignedIn
      avatar={avatar}
      manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
    />
  ))
  .add('Activity', () => (
    <UserMenu
      isSignedIn
      avatar={avatar}
      onClickSettings={() => undefined}
      onClickActivity={() => undefined}
      manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
      menuItems={
        <>
          <MenuItem>
            <Icon name="users" />
            &nbsp;Friends
          </MenuItem>
        </>
      }
    />
  ))
  .add('Activity pending', () => (
    <UserMenu
      isSignedIn
      avatar={avatar}
      onClickSettings={() => undefined}
      onClickActivity={() => undefined}
      manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
      hasActivity
      menuItems={
        <>
          <MenuItem>
            <Icon name="users" />
            &nbsp;Friends
          </MenuItem>
        </>
      }
    />
  ))
