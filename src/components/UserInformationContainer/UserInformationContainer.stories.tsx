import * as React from 'react'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { storiesOf } from '@storybook/react'
import { UserInformationContainer } from './UserInformationContainer'
import { avatar } from '../../data/avatar'

storiesOf('UserInformationContainer', module)
  .add('Signed out', () => <UserInformationContainer />)
  .add('Guest', () => <UserInformationContainer isSignedIn />)
  .add('Signed In with a claimed name', () => (
    <UserInformationContainer
      isSignedIn
      avatar={avatar}
      onClickBalance={(network: Network) => console.log(network)}
      onMenuItemClick={(id: string, trackId: string) =>
        console.log(id, trackId)
      }
      onOpen={(trackId: string) => console.log(trackId)}
      manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
    />
  ))
  .add('Signed In without a claimed name', () => (
    <UserInformationContainer
      isSignedIn
      avatar={{ ...avatar, hasClaimedName: false }}
      onClickBalance={(network: Network) => console.log(network)}
      onMenuItemClick={(id: string, trackId: string) =>
        console.log(id, trackId)
      }
      onOpen={(trackId: string) => console.log(trackId)}
      manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
    />
  ))
  .add('Activity pending', () => (
    <UserInformationContainer
      isSignedIn
      avatar={avatar}
      manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
      hasActivity
    />
  ))
  .add('LightMode', () => (
    <UserInformationContainer
      isSignedIn
      avatar={avatar}
      manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
      hasActivity
    />
  ))
