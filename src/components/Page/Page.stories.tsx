import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Atlas } from '../Atlas/Atlas'
import { Center } from '../Center/Center'
import { Container } from '../Container/Container'
import { Dropdown } from '../Dropdown/Dropdown'
import { Filter } from '../Filter/Filter'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { HeaderMenu } from '../HeaderMenu/HeaderMenu'
import { Hero } from '../Hero/Hero'
import { Navbar } from '../Navbar/Navbar'
import { Radio } from '../Radio/Radio'
import { Tabs } from '../Tabs/Tabs'
import { Row, Section, Empty, Narrow, Icon } from '../..'
import { Column } from '../Column/Column'
import { Button } from '../Button/Button'
import { Badge } from '../Badge/Badge'
import { Back } from '../Back/Back'
import { Color } from '../../colors'

import { Page } from './Page'
import './Page.stories.css'

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
  .add('Detail page', () => (
    <>
      <Navbar activePage="marketplace"></Navbar>
      <Page>
        <Section>
          <Column>
            <Back absolute />
            <Narrow>
              <Row stacked>
                <Column>
                  <Row>
                    <Header size="large">Some Title</Header>
                    <Badge color={Color.SUMMER_RED}>
                      <Icon name="point" />
                      66,66
                    </Badge>
                  </Row>
                </Column>
                <Column>
                  <Row align="right">
                    <Button basic>Transfer</Button>
                    <Button basic>Edit</Button>
                    <Button basic>Permissions</Button>
                    <Dropdown
                      trigger={
                        <Button basic>
                          <Icon name="ellipsis horizontal" />
                        </Button>
                      }
                      inline
                      direction="left"
                    >
                      <Dropdown.Menu>
                        <Dropdown.Item text="Create estate" />
                        <Dropdown.Item text="List for sale" />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Row>
                </Column>
              </Row>
            </Narrow>
          </Column>
        </Section>
        <Narrow>
          <Section>
            <Empty height={240}>Some placeholder...</Empty>
          </Section>
          <Section>
            <Header sub>Description</Header>
            <p>This is some description bla bla bla...</p>
          </Section>
          <Section size="tiny">
            <Row height={32}>
              <Column>
                <Header sub>Deployments</Header>
              </Column>
              <Column align="right">
                <Button basic>Publish</Button>
              </Column>
            </Row>
          </Section>
          <Empty height={80}>Deployments go here...</Empty>
        </Narrow>
      </Page>
      <Footer />
    </>
  ))
