import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Mana } from '../Mana/Mana'
import { Stats } from './Stats'

const meta: Meta<typeof Stats> = {
  title: 'Stats',
  component: Stats,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const SingleResult: Story = {
  render: () => (
    <>
      <Stats title="Total Voted">
        <Mana>1,235,345</Mana>
      </Stats>
    </>
  )
}

export const PollResults: Story = {
  render: () => (
    <>
      <Stats title="Token">
        <Mana>MANA</Mana>
      </Stats>
      <Stats title="Total Voted">
        <Mana>1,235,345</Mana>
      </Stats>
      <Stats title="Total Votes">20</Stats>
      <Stats title="Parcial Result">Yes</Stats>
      <Stats title="Time Left">1 week</Stats>
    </>
  )
}
