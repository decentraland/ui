import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Address, Blockie, Header, Mana, Table } from '../..'

const rows = [
  {
    when: 'Feb 10, 2018',
    address: '0x0a7a3b5d56470f7d4bd481da3038c9b3508836ea',
    amount: 180,
    vote: 'Yes'
  },
  {
    when: 'Feb 11, 2018',
    address: '0x395cc44b1de0352939d9410dda2e477916de79bc',
    amount: 180,
    vote: 'Yes'
  },
  {
    when: 'Feb 12, 2018',
    address: '0xba863a4a0381281f53d8a008642df64de155cc3f',
    amount: 120,
    vote: 'Yes'
  },
  {
    when: 'Feb 13, 2018',
    address: '0x820126da4031fdce29b740d13199125b311019a5',
    amount: 80,
    vote: 'No'
  },
  {
    when: 'Feb 14, 2018',
    address: '0xea2cdfa541bd9edea14ad0b66f0f06dfbd760466',
    amount: 120,
    vote: 'Yes'
  },
  {
    when: 'Feb 15, 2018',
    address: '0xd2d1e6eb82b945f575849e33e674ac351d3fd28b',
    amount: 50,
    vote: 'Yes'
  },
  {
    when: 'Feb 16, 2018',
    address: '0x727dd230d55bf5acc0367323c60d45ada13e51f6',
    amount: 50,
    vote: 'Yes'
  }
]

storiesOf('Table', module).add('Votes', () => (
  <div style={{ width: 1024 }}>
    <Header>Votes</Header>
    <Table basic>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>When</Table.HeaderCell>
          <Table.HeaderCell>Address</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell>Vote</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rows.map(({ when, address, amount, vote }, index) => (
          <Table.Row key={index}>
            <Table.Cell>{when}</Table.Cell>
            <Table.Cell>
              <Blockie scale={3} seed={address}>
                &nbsp;<Address value={address} />
              </Blockie>
            </Table.Cell>
            <Table.Cell>
              <Mana size="small" text />
              {amount}
            </Table.Cell>
            <Table.Cell>{vote}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
))
