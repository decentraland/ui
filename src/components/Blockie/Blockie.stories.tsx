import type { Meta, StoryObj } from '@storybook/react'
import { Address } from '../Address/Address'
import { Mana } from '../Mana/Mana'
import { Blockie } from './Blockie'

const address = '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942'

const meta: Meta<typeof Blockie> = {
  title: 'Blockie',
  component: Blockie,
}

export default meta
type Story = StoryObj<typeof Blockie>

export const Single: Story = {
  render: () => <Blockie seed={address} />,
}

export const Scales: Story = {
  render: () => (
    <>
      <Blockie seed={address} scale={2} />
      <Blockie seed={address} scale={3} />
      <Blockie seed={address} scale={5} />
      <Blockie seed={address} scale={8} />
      <Blockie seed={address} scale={13} />
      <Blockie seed={address} scale={21} />
    </>
  ),
}

export const CircularShape: Story = {
  render: () => <Blockie seed={address} shape="circle" />,
}

export const InAParagraph: Story = {
  render: () => (
    <p>
      You've transfered <Mana inline>1,000</Mana> to{' '}
      <Blockie scale={3} seed={address}>
        <Address value={address} strong />
      </Blockie>
      .
    </p>
  ),
}
