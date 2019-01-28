import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Modal, Header, Button } from '../..'
import './Modal.stories.css'

storiesOf('Modal', module).add('Simple', () => (
  <div className="story">
    <Modal open={true} size="small">
      <Header size="large" content="Header" />
      <Modal.Content>
        This is a simple modal content
        <Modal.Description>With some description inside</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button basic size="medium">
          CANCEL
        </Button>
        <Button primary size="medium">
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  </div>
))
