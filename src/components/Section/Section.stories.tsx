import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Section } from './Section'
import { Header } from '../Header/Header'

storiesOf('Section', module)
  .addDecorator(centered)
  .add('Example', () => (
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
  ))
