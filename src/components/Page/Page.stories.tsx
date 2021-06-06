import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Table from 'semantic-ui-react/dist/commonjs/collections/Table'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import { Atlas, Layer, Coord } from '../Atlas/Atlas'
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
import { Column } from '../Column/Column'
import { Button } from '../Button/Button'
import { Badge } from '../Badge/Badge'
import { Back } from '../Back/Back'
import { Row } from '../Row/Row'
import { Section } from '../Section/Section'
import { Empty } from '../Empty/Empty'
import { Narrow } from '../Narrow/Narrow'
import { Color } from '../../colors'

import { Page } from './Page'
import './Page.stories.css'

const selected: Coord[] = [{ x: 22, y: 22 }]

function isSelected(x: number, y: number) {
  return selected.some((coord) => coord.x === x && coord.y === y)
}

const selectedStrokeLayer: Layer = (x, y) => {
  return isSelected(x, y) ? { color: '#ff0044', scale: 1.4 } : null
}

const selectedFillLayer: Layer = (x, y) => {
  return isSelected(x, y) ? { color: '#ff9990', scale: 1.2 } : null
}

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
                <Column align="right">
                  <Row align="right">
                    <Button basic>Transfer</Button>
                    <Button basic>Edit</Button>
                    <Button basic>Permissions</Button>
                    <Dropdown
                      trigger={
                        <Row>
                          <Button basic>
                            <Icon name="ellipsis horizontal" />
                          </Button>
                        </Row>
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
                <Row>
                  <Header sub>Deployments</Header>
                </Row>
              </Column>
              <Column align="right">
                <Row>
                  <Button basic>Publish</Button>
                </Row>
              </Column>
            </Row>
          </Section>
          <Empty height={80}>Deployments go here...</Empty>
        </Narrow>
      </Page>
      <Footer />
    </>
  ))
  .add('Table page', () => (
    <>
      <Navbar isFullscreen />
      <Tabs>
        <Tabs.Tab active>Land</Tabs.Tab>
        <Tabs.Tab>Scenes</Tabs.Tab>
      </Tabs>
      <Page className="table-story">
        <Row height={30}>
          <Column>
            <Row>
              <Header sub>120 ITEMS</Header>
            </Row>
          </Column>
          <Column align="right">
            <Row align="right">
              <Radio checked={true} label="Owner" />
              <Radio checked={true} label="Operator" />
              <Radio checked={true} label="Host" />
            </Row>
          </Column>
        </Row>

        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Coordinates</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Operated By</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Current Scene</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Row>
                  <Column>
                    <Atlas
                      x={22}
                      y={22}
                      width={45}
                      height={45}
                      layers={[selectedStrokeLayer, selectedFillLayer]}
                      isDraggable={false}
                      size={9}
                    />
                  </Column>
                  <Column>Delta City</Column>
                </Row>
              </Table.Cell>
              <Table.Cell>66,66</Table.Cell>
              <Table.Cell>Owner</Table.Cell>
              <Table.Cell>Kyllian</Table.Cell>
              <Table.Cell>Parcel</Table.Cell>
              <Table.Cell>Magic Forrest</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Row>
                  <Column>
                    <Atlas
                      x={22}
                      y={22}
                      width={45}
                      height={45}
                      layers={[selectedStrokeLayer, selectedFillLayer]}
                      isDraggable={false}
                      size={9}
                    />
                  </Column>
                  <Column>Delta City</Column>
                </Row>
              </Table.Cell>
              <Table.Cell>66,66</Table.Cell>
              <Table.Cell>Owner</Table.Cell>
              <Table.Cell>Kyllian</Table.Cell>
              <Table.Cell>Parcel</Table.Cell>
              <Table.Cell>Magic Forrest</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Row>
                  <Column>
                    <Atlas
                      x={22}
                      y={22}
                      width={45}
                      height={45}
                      layers={[selectedStrokeLayer, selectedFillLayer]}
                      isDraggable={false}
                      size={9}
                    />
                  </Column>
                  <Column>Delta City</Column>
                </Row>
              </Table.Cell>
              <Table.Cell>66,66</Table.Cell>
              <Table.Cell>Owner</Table.Cell>
              <Table.Cell>Kyllian</Table.Cell>
              <Table.Cell>Parcel</Table.Cell>
              <Table.Cell>Magic Forrest</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Row>
                  <Column>
                    <Atlas
                      x={22}
                      y={22}
                      width={45}
                      height={45}
                      layers={[selectedStrokeLayer, selectedFillLayer]}
                      isDraggable={false}
                      size={9}
                    />
                  </Column>
                  <Column>Delta City</Column>
                </Row>
              </Table.Cell>
              <Table.Cell>66,66</Table.Cell>
              <Table.Cell>Owner</Table.Cell>
              <Table.Cell>Kyllian</Table.Cell>
              <Table.Cell>Parcel</Table.Cell>
              <Table.Cell>Magic Forrest</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Row>
                  <Column>
                    <Atlas
                      x={22}
                      y={22}
                      width={45}
                      height={45}
                      layers={[selectedStrokeLayer, selectedFillLayer]}
                      isDraggable={false}
                      size={9}
                    />
                  </Column>
                  <Column>Delta City</Column>
                </Row>
              </Table.Cell>
              <Table.Cell>66,66</Table.Cell>
              <Table.Cell>Owner</Table.Cell>
              <Table.Cell>Kyllian</Table.Cell>
              <Table.Cell>Parcel</Table.Cell>
              <Table.Cell>Magic Forrest</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Row>
                  <Column>
                    <Atlas
                      x={22}
                      y={22}
                      width={45}
                      height={45}
                      layers={[selectedStrokeLayer, selectedFillLayer]}
                      isDraggable={false}
                      size={9}
                    />
                  </Column>
                  <Column>Delta City</Column>
                </Row>
              </Table.Cell>
              <Table.Cell>66,66</Table.Cell>
              <Table.Cell>Owner</Table.Cell>
              <Table.Cell>Kyllian</Table.Cell>
              <Table.Cell>Parcel</Table.Cell>
              <Table.Cell>Magic Forrest</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Page>
      <Footer />
    </>
  ))
