import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Address, Blockie, Header, Mana, Table } from '../..'

const getAddress = () => {
  let address = '0x'
  for (let i = 0; i < 40; i++) {
    address += ((Math.random() * 16) | 0).toString(16)
  }
  return address
}
const rows = []
for (let i = 0; i < 10; i++) {
  rows.push({
    when: `Feb ${i + 10}, 2018`,
    address: getAddress(),
    amount: ((20 * Math.random()) | 0) * 10,
    vote: Math.random() < 0.5 ? 'Yes' : 'No'
  })
}

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
              <Mana size="small" black />
              {amount}
            </Table.Cell>
            <Table.Cell>{vote}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
))
