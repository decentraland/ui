import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ProviderType } from '@dcl/schemas/dist/dapps/provider-type'
import { Loader } from './Loader'
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'

const meta: Meta<typeof Loader> = {
  title: 'Loader',
  component: Loader,
}

export default meta
type Story = StoryObj<typeof Loader>

export const MainLoader: Story = {
  render: () => <Loader active size="massive" />,
}

export const TinyLoader: Story = {
  render: () => <Loader active size="mini" />,
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
  ),
}
