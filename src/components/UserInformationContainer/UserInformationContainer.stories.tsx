import * as React from 'react'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { storiesOf } from '@storybook/react'
import { UserInformationContainer } from './UserInformationContainer'
import { avatar } from '../../data/avatar'

storiesOf('UserInformationContainer', module)
  .add('Signed out', () => <UserInformationContainer />)
  .add('Guest', () => <UserInformationContainer isSignedIn />)
  .add('Signed In', () => (
    <UserInformationContainer
      isSignedIn
      avatar={avatar}
      onClickBalance={(network: Network) => console.log(network)}
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
