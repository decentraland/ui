import * as React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Navbar,
  Page,
  Header,
  Footer,
  Container,
  Hero,
  Center,
  Tabs,
  Filter,
  Dropdown,
  Radio,
  Atlas
} from '../..'

import './Page.stories.css'
import { HeaderMenu } from '../HeaderMenu/HeaderMenu'

storiesOf('Page', module)
  .add('Regular page', () => {
    return (
      <div className="Page-story-container">
        <Navbar activePage="marketplace" />
        <Page>
          <Header>Hello Wolrd</Header>
          <p>This is a regular page</p>
        </Page>
        <Footer />
      </div>
    )
  })
  .add('Menu page', () => {
    return (
      <div className="Page-story-container">
        <Navbar isFullscreen activePage="marketplace" />
        <Tabs>
          <Tabs.Tab active>Atlas</Tabs.Tab>
          <Tabs.Tab>Market</Tabs.Tab>
          <Tabs.Tab>My Assets</Tabs.Tab>
        </Tabs>
        <Page>
          <Header>Hello Wolrd</Header>
          <p>This page has a menu</p>
        </Page>
        <Footer />
      </div>
    )
  })
  .add('Menu and submenu page', () => {
    return (
      <div className="Page-story-container">
        <Navbar isFullscreen activePage="marketplace" />
        <Tabs>
          <Tabs.Tab active>Atlas</Tabs.Tab>
          <Tabs.Tab>Market</Tabs.Tab>
          <Tabs.Tab>My Assets</Tabs.Tab>
        </Tabs>
        <Page>
          <HeaderMenu>
            <HeaderMenu.Left>
              <Filter active>2 Parcels</Filter>
              <Filter>1 Estate</Filter>
              <Filter>1 Contributions</Filter>
              <Filter>1 Mortgage</Filter>
            </HeaderMenu.Left>
            <HeaderMenu.Right>
              <span className="secondary-text" style={{ marginRight: 8 }}>
                On Sale
              </span>
              <Radio toggle style={{ padding: 5, marginRight: 8 }} />
              <Dropdown text="Newest" direction="left">
                <Dropdown.Menu>
                  <Dropdown.Item text="Newest" active />
                  <Dropdown.Item text="Cheapest" />
                  <Dropdown.Item text="Closest to expire" />
                </Dropdown.Menu>
              </Dropdown>
            </HeaderMenu.Right>
          </HeaderMenu>
        </Page>
        <Footer />
      </div>
    )
  })
  .add('Menu and fullscreen page', () => {
    return (
      <div className="Page-story-container">
        <Navbar isFullscreen activePage="marketplace" />
        <Tabs isFullscreen>
          <Tabs.Tab active>Atlas</Tabs.Tab>
          <Tabs.Tab>Market</Tabs.Tab>
          <Tabs.Tab>My Assets</Tabs.Tab>
        </Tabs>
        <Page isFullscreen>
          <Atlas />
        </Page>
        <Footer isFullscreen />
      </div>
    )
  })
  .add('Hero page', () => {
    return (
      <div className="Page-story-container">
        <Navbar isFullscreen activePage="marketplace" />
        <Page isFullscreen>
          <Hero centered>
            <Hero.Header>ATLAS</Hero.Header>
            <Hero.Description>Or something like that</Hero.Description>
          </Hero>
          <Container>
            <Header>Hello Wolrd</Header>
            <p>This page has a hero</p>
          </Container>
        </Page>
        <Footer />
      </div>
    )
  })
  .add('Fullscreen page', () => {
    return (
      <div className="Page-story-container">
        <Navbar isFullscreen activePage="marketplace" />
        <Page isFullscreen>
          <Center>
            <Header size="huge">Oops</Header>
            <p>Nothing to do here.</p>
          </Center>
        </Page>
        <Footer isFullscreen />
      </div>
    )
  })
