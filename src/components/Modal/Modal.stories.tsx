import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Button } from '../Button/Button'
import { Center } from '../Center/Center'
import { Close } from '../Close/Close'
import { Field } from '../Field/Field'
import { Header } from '../Header/Header'
import { Mana } from '../Mana/Mana'
import { ModalNavigation } from '../ModalNavigation/ModalNavigation'
import { Radio } from '../Radio/Radio'

import { Modal } from './Modal'
import './Modal.stories.css'

const lipsum = (
  <>
    <Header>Lorem Ipsum</Header>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in
      tincidunt lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed ornare rutrum lorem vehicula finibus. Donec vitae lorem consequat,
      suscipit nibh sit amet, euismod nunc. Sed gravida faucibus nulla vitae
      luctus. Aliquam libero lacus, faucibus ac neque ut, hendrerit pulvinar
      quam. Nunc porta porttitor nulla et dignissim. Aenean lobortis libero
      aliquet dolor pulvinar dapibus. Sed tristique scelerisque nulla, in
      feugiat neque lacinia in. Cras vulputate turpis in orci interdum accumsan.
    </p>
    <p>
      Phasellus sit amet eleifend sapien, vel commodo nibh. Morbi mi lectus,
      vulputate eget turpis nec, aliquam efficitur lacus. Morbi gravida nisi et
      purus facilisis, at molestie neque vulputate. Sed in nulla mollis justo
      aliquam egestas. Aliquam gravida porta augue, et lobortis ante tincidunt
      ut. Nam varius lorem suscipit dolor malesuada finibus. Quisque ullamcorper
      purus ut tincidunt vehicula. Sed hendrerit porttitor lacinia. Fusce eget
      arcu augue. Quisque ullamcorper imperdiet libero, sed interdum augue
      congue eu. Fusce finibus scelerisque odio, id facilisis ante sagittis sit
      amet. Nulla vulputate lobortis tellus in dapibus. Suspendisse non tempus
      nulla. Nulla egestas malesuada interdum. Aliquam malesuada placerat nisl
      nec ultrices.
    </p>
    <p>
      Duis a viverra ipsum, in pellentesque est. Nullam interdum vehicula massa
      sed porttitor. Ut condimentum lacinia iaculis. Pellentesque porta euismod
      nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
      vitae mattis ipsum, a bibendum nisi. Sed nec ante ultricies, pretium nulla
      sit amet, congue sem. Nulla at sodales enim. Nam a dignissim tortor.
      Quisque feugiat est nec tortor eleifend ornare nec vel velit. Praesent
      rhoncus nisl ut convallis posuere. Nam sollicitudin eros sem, a
      consectetur sem interdum non. Phasellus ac dolor eget lacus feugiat
      ullamcorper.
    </p>
  </>
)

storiesOf('Modal', module)
  .addDecorator(centered)
  .add('Simple', () => (
    <div className="Modal-story">
      {lipsum}
      <Modal open={true}>
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
  ))
  .add('Small', () => (
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
  ))
  .add('Tiny', () => (
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
  ))
  .add('Custom Header', () => (
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
  ))
  .add('Form', () => (
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
  ))
  .add('Closable', () => (
    <div className="Modal-story">
      {lipsum}
      <Modal size="small" open={true} closeIcon={<Close />}>
        <Modal.Header>I'm annoying!</Modal.Header>
        <Modal.Content>
          <p>This is an alert or something like that.</p>
          <p>It doesn't have any actions but you can dismiss it.</p>
        </Modal.Content>
      </Modal>
    </div>
  ))
  .add('Navigation', () => (
    <div className="Modal-story">
      {lipsum}
      <Modal open={true}>
        <ModalNavigation
          title="Edit BMX Pack"
          subtitle="Edit your Asset Pack details and manage your objects"
          onBack={() => alert('Back!')}
          onClose={() => alert('Close!')}
        />
        <Modal.Content>Bla bla bla</Modal.Content>
      </Modal>
    </div>
  ))
