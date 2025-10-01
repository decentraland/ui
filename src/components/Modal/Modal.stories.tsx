import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button/Button'
import { Center } from '../Center/Center'
import { Close } from '../Close/Close'
import { Field } from '../Field/Field'
import { Header } from '../Header/Header'
import { Mana } from '../Mana/Mana'
import { Radio } from 'semantic-ui-react'
import { Modal } from './Modal'
import './Modal.stories.css'

const lipsum = (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in
      tincidunt lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed ornare rutrum lorem vehicula finibus. Donec vitae lorem consequat,
      suscipit nibh sit amet, euismod nunc. Sed gravida faucibus nulla vitae
      luctus. Aliquam libero lacus, faucibus ac neque ut, hendrerit pulvinar
      quam. Nunc porta porttitor nulla et dignissim. Aenean lobortis libero
      vitae nisi ultricies, vitae aliquam nunc ultricies. Sed euismod, nisl
      vitae ultricies ultricies, nisl nisl aliquam nunc, vitae aliquam nunc
      nisl vitae nisl. Sed euismod, nisl vitae ultricies ultricies, nisl nisl
      aliquam nunc, vitae aliquam nunc nisl vitae nisl.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in
      tincidunt lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed ornare rutrum lorem vehicula finibus. Donec vitae lorem consequat,
      suscipit nibh sit amet, euismod nunc. Sed gravida faucibus nulla vitae
      luctus. Aliquam libero lacus, faucibus ac neque ut, hendrerit pulvinar
      quam. Nunc porta porttitor nulla et dignissim. Aenean lobortis libero
      vitae nisi ultricies, vitae aliquam nunc ultricies. Sed euismod, nisl
      vitae ultricies ultricies, nisl nisl aliquam nunc, vitae aliquam nunc
      nisl vitae nisl. Sed euismod, nisl vitae ultricies ultricies, nisl nisl
      aliquam nunc, vitae aliquam nunc nisl vitae nisl.
    </p>
  </>
)

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="Modal-story">
      {lipsum}
      <Modal size="small" open={true}>
        <Modal.Header>Are you sure?</Modal.Header>
        <Modal.Content>
          You are about to sell your soul for{' '}
          <Mana inline>{(2500).toLocaleString()}</Mana>. Do you want to proceed?
        </Modal.Content>
        <Modal.Actions>
          <Button primary>Proceed</Button>
          <Button>Cancel</Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export const Small: Story = {
  render: () => (
    <div className="Modal-story">
      {lipsum}
      <Modal size="small" open={true}>
        <Modal.Header>Are you sure?</Modal.Header>
        <Modal.Content>
          You are about to sell your soul for{' '}
          <Mana inline>{(2500).toLocaleString()}</Mana>. Do you want to proceed?
        </Modal.Content>
        <Modal.Actions>
          <Button primary>Proceed</Button>
          <Button>Cancel</Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export const Tiny: Story = {
  render: () => (
    <div className="Modal-story">
      {lipsum}
      <Modal size="tiny" open={true}>
        <Modal.Header>Are you sure?</Modal.Header>
        <Modal.Content>
          You are about to sell your soul for{' '}
          <Mana inline>{(2500).toLocaleString()}</Mana>. Do you want to proceed?
        </Modal.Content>
        <Modal.Actions>
          <Button primary>Proceed</Button>
          <Button>Cancel</Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export const CustomHeader: Story = {
  render: () => (
    <div className="Modal-story">
      {lipsum}
      <Modal size="small" open={true}>
        <div className="Modal-custom-header">
          <Center>
            <Header size="large">Give us your email!</Header>
            <p>We need to feed our marketing gnomes</p>
          </Center>
        </div>
        <Modal.Content>
          Keep up to date with news and important announcements.
        </Modal.Content>
        <Modal.Content>
          <Radio label="Suscribe to newsletter" />
        </Modal.Content>
        <Modal.Actions>
          <Button primary>Continue</Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export const Form: Story = {
  render: () => (
    <div className="Modal-story">
      {lipsum}
      <Modal size="small" open={true}>
        <Modal.Header>Join us!</Modal.Header>
        <Modal.Content>
          <Field label="Name" placeholder="Luis XVII" />
          <Field label="Email" placeholder="luigi@mail.com" />
          <Radio label="Check me" />
        </Modal.Content>
        <Modal.Actions>
          <Button primary>Submit</Button>
          <Button>Cancel</Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export const Closable: Story = {
  render: () => (
    <div className="Modal-story">
      {lipsum}
      <Modal size="small" open={true} closeIcon={<Close />}>
        <Modal.Header>I'm annoying!</Modal.Header>
        <Modal.Content>
          <p>This is an alert or something like that.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button primary>OK</Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}
