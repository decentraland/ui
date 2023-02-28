import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Address } from '../Address/Address'
import { Box } from './Box'
import { Blockie } from '../Blockie/Blockie'

const address = '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942'

storiesOf('Box', module)
  .add('Without header', () => (
    <Box>
      <Blockie seed={address}>
        <Address value={address} strong />
      </Blockie>
    </Box>
  ))
  .add('With header', () => (
    <Box header="Children with header">
      <Blockie seed={address}>
        <Address value={address} strong />
      </Blockie>
    </Box>
  ))
  .add('Without border', () => (
    <Box header="Without border" borderless>
      <Blockie seed={address}>
        <Address value={address} strong />
      </Blockie>
    </Box>
  ))
  .add('Collapsible', () => (
    <Box header="Without border" collapsible>
      <Blockie seed={address}>
        <Address value={address} strong />
      </Blockie>
    </Box>
  ))
  .add('Collapsed', () => (
    <Box header="Without border" collapsible collapsed>
      <Blockie seed={address}>
        <Address value={address} strong />
      </Blockie>
    </Box>
  ))
