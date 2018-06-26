import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Icon, Menu, Navbar } from '../..'

const pageStyle = {
  width: 1024,
  borderRadius: 8
  //border: '1px solid #eee'
}

storiesOf('Navbar', module)
  .add('Static', () => {
    return (
      <div style={pageStyle}>
        <Navbar />
      </div>
    )
  })
  .add('Connecting...', () => {
    return (
      <div style={pageStyle}>
        <Navbar
          isConnected={false}
          isConnecting
          connectingMenuItem={<Menu.Item>Connecting...</Menu.Item>}
        />
      </div>
    )
  })
  .add('Logged In', () => {
    const address = '0x0a7a3b5d56470f7d4bd481da3038c9b3508836ea'
    return (
      <div style={pageStyle}>
        <Navbar
          mana={20000}
          address={address}
          onClickAccount={action('Account clicked!')}
          onClickLogo={action('Logo clicked!')}
        />
      </div>
    )
  })
  .add('Logged Out', () => {
    return (
      <div style={pageStyle}>
        <Navbar
          isConnected={false}
          isConnecting
          connectingMenuItem={
            <Menu.Item onClick={action('Sign In clicked!')}>Sign In</Menu.Item>
          }
        />
      </div>
    )
  })
  .add('With Menu', () => {
    const address = '0x0a7a3b5d56470f7d4bd481da3038c9b3508836ea'
    const menuItems = (
      <>
        <Menu.Item active onClick={action('Atlas clicked')}>
          Atlas
        </Menu.Item>
        <Menu.Item onClick={action('Marketplace clicked!')}>
          Marketplace
        </Menu.Item>
        <Menu.Item onClick={action('My Land clicked!')}>My Land</Menu.Item>
      </>
    )
    const accountMenuItems = (
      <Menu.Item onClick={action('Activity clicked!')}>
        <Icon name="bell" />
      </Menu.Item>
    )
    return (
      <div style={pageStyle}>
        <Navbar
          mana={20000}
          address={address}
          menuItems={menuItems}
          accountMenuItems={accountMenuItems}
          activePage="Atlas" /* this is for the mobile navbar */
          onClickAccount={action('Account clicked!')}
          onClickLogo={action('Logo clicked!')}
        />
      </div>
    )
  })
  .add('Modal', () => {
    return (
      <div style={pageStyle}>
        <Navbar isModal onBack={action('Go Back clicked!')} />
      </div>
    )
  })
