import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Container } from '../Container/Container'
import { HeaderMenu } from '../HeaderMenu/HeaderMenu'
import { Header } from '../Header/Header'
import { Dropdown } from '../Dropdown/Dropdown'
import { Mana } from '../Mana/Mana'

import { Table } from './Table'
import './Table.stories.css'

const rows = [
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

storiesOf('Table', module)
  .addDecorator(centered)
  .add('Polls', () => (
    <Container>
      <HeaderMenu>
        <HeaderMenu.Left>
          <Header size="large">District polls</Header>
        </HeaderMenu.Left>
        <HeaderMenu.Right>
          <Dropdown text="Newest" direction="left" />
          <Dropdown text="All polls" direction="left" />
        </HeaderMenu.Right>
      </HeaderMenu>
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Poll</Table.HeaderCell>
            <Table.HeaderCell>Weight</Table.HeaderCell>
            <Table.HeaderCell>Voters</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Outcome</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows.map(({ poll, weight, voters, status, outcome }, index) => {
            const isClosed = status === 'Closed'
            const linkClass = isClosed ? 'link-closed' : null
            const noLinkClass = isClosed ? 'closed' : null
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <a className={linkClass} href="#">
                    {poll}
                  </a>
                </Table.Cell>
                <Table.Cell className={noLinkClass}>
                  <Mana inline />
                  {weight}
                </Table.Cell>
                <Table.Cell className={noLinkClass}>{voters}</Table.Cell>
                <Table.Cell className={noLinkClass}>{status}</Table.Cell>
                <Table.Cell className={noLinkClass}>{outcome}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </Container>
  ))
