import * as React from 'react'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { storiesOf } from '@storybook/react'
import { UserMenu } from './UserMenu'
import { avatar } from '../../data/avatar'

import './UserMenu.stories.css'

storiesOf('UserMenu', module)
  .add('Signed out', () => (
    <div className="usermenu-story-container">
      <UserMenu />
    </div>
  ))
  .add('Signed in', () => (
    <div className="usermenu-story-container">
      <UserMenu isSignedIn avatar={avatar} />
    </div>
  ))
  .add('Guest', () => (
    <div className="usermenu-story-container">
      <UserMenu
        isSignedIn
        avatar={{ ...avatar, hasClaimedName: false }}
        manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
        onClickOpen={(
          event: React.MouseEvent<HTMLElement, MouseEvent>,
          trackId: string
        ) => console.log(event, trackId)}
        onClickBalance={(
          event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
          network: Network
        ) => console.log(event, network)}
      />
    </div>
  ))
  .add('Clickable profile', () => (
    <div className="usermenu-story-container">
      <UserMenu isSignedIn avatar={avatar} onClickProfile={() => undefined} />
    </div>
  ))
  .add('Mana', () => (
    <div className="usermenu-story-container">
      <UserMenu
        isSignedIn
        avatar={avatar}
        manaBalances={{ [Network.ETHEREUM]: 1000 }}
      />
    </div>
  ))
  .add('Mana L2', () => (
    <div className="usermenu-story-container">
      <UserMenu
        isSignedIn
        avatar={avatar}
        manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
      />
    </div>
  ))
  .add('Activity', () => (
    <div className="usermenu-story-container">
      <UserMenu
        isSignedIn
        avatar={avatar}
        onClickSettings={() => undefined}
        onClickActivity={() => undefined}
        manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
      />
    </div>
  ))
  .add('Activity pending', () => (
    <div className="usermenu-story-container">
      <UserMenu
        isSignedIn
        avatar={avatar}
        onClickSettings={() => undefined}
        onClickActivity={() => undefined}
        manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
        hasActivity
      />
    </div>
  ))
