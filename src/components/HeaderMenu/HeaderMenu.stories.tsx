import * as React from 'react'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'
import { Dropdown } from '../Dropdown/Dropdown'
import { Header } from '../Header/Header'
import { HeaderMenu } from './HeaderMenu'

storiesOf('HeaderMenu', module)
  .addDecorator(centered)
  .add('With Button', () => (
    <Container>
      <HeaderMenu>
        <HeaderMenu.Left>
          <Header>District polls</Header>
        </HeaderMenu.Left>
        <HeaderMenu.Right>
          <Button basic size="small">
            View More
            <Icon name="chevron right" />
          </Button>
        </HeaderMenu.Right>
      </HeaderMenu>
    </Container>
  ))
  .add('With Dropdown and stacked', () => (
    <Container>
      <HeaderMenu stackable>
        <HeaderMenu.Left>
          <Header>District polls</Header>
        </HeaderMenu.Left>
        <HeaderMenu.Right>
          <Dropdown text="Newest" direction="left">
            <Dropdown.Menu>
              <Dropdown.Item text="Newest" />
              <Dropdown.Item text="Closest to end" />
              <Dropdown.Item text="Highest weight" />
              <Dropdown.Item text="Most voted" />
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown text="All polls" direction="left">
            <Dropdown.Menu>
              <Dropdown.Item text="All polls" />
              <Dropdown.Item text="Ongoing polls" />
              <Dropdown.Item text="Closed polls" />
            </Dropdown.Menu>
          </Dropdown>
        </HeaderMenu.Right>
      </HeaderMenu>
    </Container>
  ))
