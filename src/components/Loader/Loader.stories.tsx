import * as React from 'react'
import { ProviderType } from '@dcl/schemas/dist/dapps/provider-type'
import type { Meta, StoryObj } from '@storybook/react'
import { Loader } from './Loader'
import { Grid } from 'semantic-ui-react'

const meta: Meta<typeof Loader> = {
  title: 'Loader',
  component: Loader,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const MainLoader: Story = {
  render: () => <Loader active size="massive" />
}

export const TinyLoader: Story = {
  render: () => <Loader active size="mini" />
}

export const WithProvider: Story = {
  render: () => (
    <Grid stackable container centered>
      <Grid.Row>
        <Grid.Column tablet={4}>
          <Loader active size="massive" provider={ProviderType.INJECTED} />
        </Grid.Column>
        <Grid.Column tablet={4}>
          <Loader
            active
            size="massive"
            provider={ProviderType.WALLET_CONNECT}
          />
        </Grid.Column>
        <Grid.Column tablet={4}>
          <Loader active size="massive" provider={ProviderType.FORTMATIC} />
        </Grid.Column>
        <Grid.Column tablet={4}>
          <Loader active size="massive" provider={ProviderType.WALLET_LINK} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
