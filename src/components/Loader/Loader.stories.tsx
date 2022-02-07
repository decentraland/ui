import * as React from 'react'
import { ProviderType } from '@dcl/schemas/dist/dapps/provider-type'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Loader } from './Loader'
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'

storiesOf('Loader', module)
  .addDecorator(centered)
  .add('Main Loader', () => <Loader active size="massive" />)
  .add('Tiny Loader', () => <Loader active size="mini" />)
  .add('With Provider', () => (
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
  ))
