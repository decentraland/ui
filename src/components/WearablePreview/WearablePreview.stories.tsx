import * as React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Container,
  Footer,
  Header,
  Hero,
  Navbar,
  Page,
  Tabs,
  WearablePreview,
} from '../..'
import './WearablePreview.stories.css'

storiesOf('WearablePreview', module)
  .add('Preview an item', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="0xee8ae4c668edd43b34b98934d6d2ff82e41e6488"
        itemId="5"
      />
    </div>
  ))
  .add('Preview a token', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="0xee8ae4c668edd43b34b98934d6d2ff82e41e6488"
        tokenId="1"
      />
    </div>
  ))
  .add('Preview a token from ropsten', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="0x07e2a8fce1eb1ddf8e7d8de3f86654abe32eb97f"
        tokenId="1"
        dev={true}
      />
    </div>
  ))
  .add('Preview a texture wearable', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="0xfeb52cbf71b9adac957c6f948a6cf9980ac8c907"
        tokenId="3073"
      />
    </div>
  ))
  .add('Using onLoad callback', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="0xee8ae4c668edd43b34b98934d6d2ff82e41e6488"
        itemId="5"
        onLoad={() => console.log('loaded!')}
      />
    </div>
  ))
  .add('Use as Hero', () => (
    <div className="WearablePreview-story-container">
      <Navbar isFullscreen activePage="marketplace" />
      <Tabs isFullscreen>
        <Tabs.Tab active>Atlas</Tabs.Tab>
        <Tabs.Tab>Market</Tabs.Tab>
        <Tabs.Tab>My Assets</Tabs.Tab>
      </Tabs>
      <Page isFullscreen>
        <Hero height={420}>
          <WearablePreview
            contractAddress="0xee8ae4c668edd43b34b98934d6d2ff82e41e6488"
            itemId="5"
          />
        </Hero>
        <Container>
          <Header>Hello Wolrd</Header>
          <p>This page has a hero</p>
        </Container>
      </Page>
      <Footer />
    </div>
  ))
