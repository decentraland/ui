import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Navbar } from './Navbar'
import { NavbarPages } from './Navbar.types'

const meta: Meta<typeof Navbar> = {
  title: 'Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <>
      <Navbar
        activePage={NavbarPages.MARKETPLACE}
        isSignedIn={false}
        isSigningIn={false}
        onClickSignIn={() => undefined}
      />
    </>
  )
}

export const Basic: Story = {
  render: () => (
    <>
      <Navbar
        activePage={NavbarPages.MARKETPLACE}
        isSignedIn={false}
        isSigningIn={false}
        onClickSignIn={() => undefined}
      />
    </>
  )
}

export const Connected: Story = {
  render: () => (
    <>
      <Navbar
        activePage={NavbarPages.MARKETPLACE}
        isSignedIn={true}
        isSigningIn={false}
        address="0x1234567890123456789012345678901234567890"
        onClickSignIn={() => undefined}
      />
    </>
  )
}
