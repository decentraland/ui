import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { avatar } from '../../data/avatar'

import { Navbar2 } from './Navbar2'
import './Navbar2.stories.css'
import { Navbar2Pages } from './Navbar2.types'
import { Network } from '@dcl/schemas/dist/dapps/network'

storiesOf('Navbar2', module)
  .add('LEARN', () => {
    return (
      <div className="navbar2-story-container">
        <Navbar2 activePage={Navbar2Pages.LEARN} />
      </div>
    )
  })
  .add('Sign In', () => {
    return (
      <div className="navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.LEARN}
          onSignIn={() => console.log('Clicked on sign in')}
        />
      </div>
    )
  })
  .add('Signed in', () => {
    return (
      <div className="navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.LEARN}
          isSignedIn
          avatar={avatar}
          onSignIn={() => console.log('Clicked on sign in')}
        />
      </div>
    )
  })
  .add('Signed in', () => {
    return (
      <div className="navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.LEARN}
          isSignedIn
          avatar={avatar}
          onSignIn={() => console.log('Clicked on sign in')}
        />
      </div>
    )
  })
  .add('With Balance', () => {
    return (
      <div className="navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.LEARN}
          isSignedIn
          avatar={avatar}
          manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
          onSignOut={(e) => console.log('Clicked on sign in', e)}
        />
      </div>
    )
  })
  .add('Width Activity', () => {
    return (
      <div className="navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.LEARN}
          isSignedIn
          avatar={avatar}
          onSignOut={(e) => console.log('Clicked on sign in', e)}
          manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
          onClickBalance={(e, network) =>
            console.log('Clicked on balance ', e, network)
          }
          onClickActivity={(e) => console.log('Clicked on activity ', e)}
        />
      </div>
    )
  })
  .add('Width Activity pending', () => {
    return (
      <div className="navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.LEARN}
          isSignedIn
          avatar={avatar}
          onSignOut={(e) => console.log('Clicked on sign in ', e)}
          manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
          onClickBalance={(e, network) =>
            console.log('Clicked on balance ', e, network)
          }
          onClickActivity={(e) => console.log('Clicked on activity ', e)}
          hasActivity
        />
      </div>
    )
  })
