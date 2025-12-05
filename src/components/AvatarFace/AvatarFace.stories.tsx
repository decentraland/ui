import type { Meta, StoryObj } from '@storybook/react'
import { AvatarFace } from './AvatarFace'
import { Mana } from '../Mana/Mana'
import { avatar } from '../../data/avatar'

const meta: Meta<typeof AvatarFace> = {
  title: 'AvatarFace',
  component: AvatarFace,
}

export default meta
type Story = StoryObj<typeof AvatarFace>

export const Single: Story = {
  render: () => <AvatarFace size="large" avatar={avatar} />,
}

export const Sizes: Story = {
  render: () => (
    <>
      <AvatarFace size="tiny" avatar={avatar} />
      <AvatarFace size="small" avatar={avatar} />
      <AvatarFace size="medium" avatar={avatar} />
      <AvatarFace size="large" avatar={avatar} />
    </>
  ),
}

export const InAParagraph: Story = {
  render: () => (
    <p>
      You've transferred <Mana inline>1,000</Mana> to{' '}
      <AvatarFace size="tiny" inline avatar={avatar} /> <strong>cazala</strong>
    </p>
  ),
}
