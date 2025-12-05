import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Section } from './Section'
import { Header } from '../Header/Header'

const meta: Meta<typeof Section> = {
  title: 'Section',
  component: Section,
}

export default meta
type Story = StoryObj<typeof Section>

export const Example: Story = {
  render: () => (
    <>
      <Section>
        <Header sub>Section 1</Header>
        This is a section
      </Section>
      <Section>
        <Header sub>Section 2</Header>
        This is another section
      </Section>
    </>
  ),
}
