import * as React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { Navbar, Menu, Icon, Parallax, Hero } from '../..'
import './Navbar.stories.css'

storiesOf('Navbar', module)
  .add('Agora', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar activePage="agora" />
      </div>
    )
  })
  .add('Sign In', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar activePage="agora" onSignIn={action('Clicked on sign in')} />
      </div>
    )
  })

  .add('Sign In Page', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage="agora"
          isSignIn
          onSignIn={action('Clicked on sign in')}
        />
      </div>
    )
  })
  .add('Connecting', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage="agora"
          onSignIn={action('Clicked on sign in')}
          isConnecting
        />
      </div>
    )
  })
  .add('Connected', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage="agora"
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
        />
      </div>
    )
  })
  .add('On click account', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage="agora"
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
          onClickAccount={action('Clicked on account menu')}
        />
      </div>
    )
  })
  .add('With menu items', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage="agora"
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
          onClickAccount={action('Clicked on account menu')}
          menuItems={
            <Menu.Item>
              <Icon
                name="bell"
                onClick={action('Clicked on notification bell')}
              />
            </Menu.Item>
          }
        />
      </div>
    )
  })
  .add('Fullscreen', () => {
    return (
      <div className="Navbar-story-container">
        <div className="background" />
        <Navbar
          activePage="agora"
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
          onClickAccount={action('Clicked on account menu')}
          isFullscreen
        />
      </div>
    )
  })
  .add('With hero', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage="agora"
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
          onClickAccount={action('Clicked on account menu')}
          menuItems={
            <Menu.Item>
              <Icon
                name="bell"
                onClick={action('Clicked on notification bell')}
              />
            </Menu.Item>
          }
          isFullscreen
        />
        <Hero height={442} centered>
          <Hero.Header>Help us build Decentraland</Hero.Header>
          <Hero.Description>Join the discussion</Hero.Description>
          <Hero.Content>
            <Parallax>
              <Parallax.Layer depth={0.3}>
                <div className="homepage-pyramid small" />
              </Parallax.Layer>
              <Parallax.Layer depth={1.5}>
                <div className="homepage-pyramid large" />
              </Parallax.Layer>
            </Parallax>
          </Hero.Content>
        </Hero>
      </div>
    )
  })
  .add('With Overlay over Hero', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage="agora"
          isConnected
          address="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
          mana={200000}
          onClickAccount={action('Clicked on account menu')}
          menuItems={
            <Menu.Item>
              <Icon
                name="bell"
                onClick={action('Clicked on notification bell')}
              />
            </Menu.Item>
          }
          isFullscreen
          isOverlay
        />
        <Hero className="over-gradient" height={442} centered>
          <Hero.Header>Help us build Decentraland</Hero.Header>
          <Hero.Description>Join the discussion</Hero.Description>
          <Hero.Content>
            <div className="color-layer" />
          </Hero.Content>
        </Hero>
      </div>
    )
  })
