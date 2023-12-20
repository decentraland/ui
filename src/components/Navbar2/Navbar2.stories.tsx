import * as React from 'react'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { storiesOf } from '@storybook/react'
import { Button } from '../Button/Button'
import { Hero } from '../Hero/Hero'
import { Parallax } from '../Parallax/Parallax'
import { UserMenu } from '../UserMenu/UserMenu'
import { avatar } from '../../data/avatar'

import { Navbar2 } from './Navbar2'
import './Navbar2.stories.css'
import { Navbar2Pages } from './Navbar2.types'

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
  .add('Sign In Page', () => {
    return (
      <div className="navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.LEARN}
          isSignIn
          onSignIn={() => console.log('Clicked on sign in')}
        />
      </div>
    )
  })
  .add('Connecting', () => {
    return (
      <div className="navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.LEARN}
          onSignIn={() => console.log('Clicked on sign in')}
          isConnecting
        />
      </div>
    )
  })
  .add('Connected', () => {
    return (
      <div className="navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.LEARN}
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
        />
      </div>
    )
  })
  .add('On click account', () => {
    return (
      <div className="navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.LEARN}
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
          onClickAccount={() => console.log('Clicked on account menu')}
        />
      </div>
    )
  })
  .add('Custom middle menu', () => {
    return (
      <div className="navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.LEARN}
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
          onClickAccount={() => console.log('Clicked on account menu')}
          middleMenu={
            <Menu.Item>
              <Icon
                name="bell"
                onClick={() => console.log('Clicked on notification bell')}
              />
            </Menu.Item>
          }
        />
      </div>
    )
  })
  .add('Custom left menu', () => {
    return (
      <div className="navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.LEARN}
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
          onClickAccount={() => console.log('Clicked on account menu')}
          leftMenu={
            <>
              <Menu.Item>Home</Menu.Item>
              <Menu.Item>About</Menu.Item>
              <Menu.Item>Contact Us</Menu.Item>
            </>
          }
        />
      </div>
    )
  })
  .add('With Left Menu Decorator', () => {
    return (
      <div className="navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.LEARN}
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
          onClickAccount={() => console.log('Clicked on account menu')}
          leftMenu={
            <>
              <Menu.Item>Home</Menu.Item>
              <Menu.Item>About</Menu.Item>
              <Menu.Item>Contact Us</Menu.Item>
            </>
          }
          leftMenuDecorator={(props: { children: React.ReactNode }) => {
            return (
              <>
                <Menu.Item>LEFT</Menu.Item>
                {props.children}
                <Menu.Item>RIGHT</Menu.Item>
              </>
            )
          }}
        />
      </div>
    )
  })
  .add('Custom right menu', () => {
    return (
      <div className="navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.LEARN}
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
          onClickAccount={() => console.log('Clicked on account menu')}
          rightMenu={
            <Button primary size="small" style={{ minWidth: 100 }}>
              Get Started
            </Button>
          }
        />
      </div>
    )
  })
  .add('With UserMenu', () => {
    return (
      <div className="navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.LEARN}
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
          onClickAccount={() => console.log('Clicked on account menu')}
          rightMenu={<UserMenu avatar={avatar} isSignedIn />}
        />
      </div>
    )
  })
  .add('With default submenus', () => {
    return (
      <div className="navbar2-story-container">
        <Navbar2 enableSubMenuSection activePage={Navbar2Pages.LEARN} />
      </div>
    )
  })
