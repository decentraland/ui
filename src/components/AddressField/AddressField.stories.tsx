import React from 'react'
import AddressField from './AddressField'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'AddressField',
  component: AddressField
} as ComponentMeta<typeof AddressField>

const Template: ComponentStory<typeof AddressField> = (args) => (
  <AddressField {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  resolveName: () => '0xtestaddresstestaddresstestaddresstestadd'
}
