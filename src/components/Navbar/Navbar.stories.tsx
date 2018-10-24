import * as React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { Navbar, Menu, Icon, Parallax, Hero } from '../..'
import './Navbar.stories.css'

const width = {
  width: 1200,
  height: 450
}

storiesOf('Navbar', module)
  .add('Agora', () => {
    return (
      <div style={width}>
        <Navbar activePage="agora">{undefined}</Navbar>
      </div>
    )
  })
  .add('Sign In', () => {
    return (
      <div style={width}>
        <Navbar activePage="agora" onSignIn={action('Clicked on sign in')} />
      </div>
    )
  })
  .add('Connecting', () => {
    return (
      <div style={width}>
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
      <div style={width}>
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
      <div style={width}>
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
      <div style={width}>
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
  .add('With hero', () => {
    return (
      <div style={width} className="navbar-story">
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
        >
          <Hero
            title="Help us build Decentraland"
            subtitle="Join the discussion"
            height={442}
          >
            <Parallax>
              <Parallax.Layer depth={0.3}>
                <div className="homepage-pyramid small" />
              </Parallax.Layer>
              <Parallax.Layer depth={1.5}>
                <div className="homepage-pyramid large" />
              </Parallax.Layer>
            </Parallax>
          </Hero>
        </Navbar>
      </div>
    )
  })
