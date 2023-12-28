import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import BackToTopButton from './BackToTopButton'

export default {
  title: 'BackToTopButton',
  component: BackToTopButton,
  argTypes: {
    threshold: { action: 'clicked' }
  }
} as ComponentMeta<typeof BackToTopButton>

const Template: ComponentStory<typeof BackToTopButton> = (args) => (
  <>
    <div style={{ height: 8000, backgroundColor: '#3d3b43', width: 500 }}>
      <span> Scroll down to see the button...</span>
    </div>
    <BackToTopButton {...args} />
  </>
)

export const Primary = Template.bind({})
Primary.args = {
  threshold: 400
}
