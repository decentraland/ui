import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'
import { Header } from '../Header/Header'
import { HeaderMenu } from '../HeaderMenu/HeaderMenu'
import { Mana } from '../Mana/Mana'
import { Card } from './Card'

const cards = [
  {
    poll: 'Proposal Acceptance for Aetheria District',
    weight: '20.5M',
    voters: 160,
    status: '2 days left',
    outcome: 'Pending'
  },
  {
    poll: 'Proposal Acceptance for Chobury',
    voters: 80,
    weight: '250.2K',
    status: '1 days left',
    outcome: 'Pending'
  },
  {
    poll: 'Proposal Acceptance for VR Shopping District',
    voters: 172,
    weight: '50.1K',
    status: '12 hours left',
    outcome: 'Pending'
  },
  {
    poll: 'Proposal Acceptance for The Movement',
    voters: 0,
    weight: '0',
    status: 'Closed',
    outcome: 'Yes'
  },
  {
    poll: 'Proposal Acceptance for NEXUS',
    voters: 20,
    weight: '100K',
    status: 'Closed',
    outcome: 'No'
  }
]

storiesOf('Card', module)
  .addDecorator(centered)
  .add('Polls', () => (
    <Container>
      <HeaderMenu>
        <HeaderMenu.Left>
          <Header>District polls</Header>
        </HeaderMenu.Left>
        <HeaderMenu.Right>
          <Button basic size="small">
            View More
            <Icon name="chevron right" />
          </Button>
        </HeaderMenu.Right>
      </HeaderMenu>
      <Card.Group>
        {cards.map((card, index) => (
          <Card link key={index}>
            <Card.Content>
              <Card.Header>{card.poll}</Card.Header>
              <Card.Meta>
                Weight {card.weight} <Mana inline />
              </Card.Meta>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  ))
