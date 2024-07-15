import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import AddressField from './AddressField'

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
