import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'
import { Dropdown } from '../Dropdown/Dropdown'
import { Header } from '../Header/Header'
import { HeaderMenu } from './HeaderMenu'

const meta: Meta<typeof HeaderMenu> = {
  title: 'HeaderMenu',
  component: HeaderMenu,
}

export default meta
type Story = StoryObj<typeof HeaderMenu>

export const WithButton: Story = {
  render: () => (
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
  ),
}

export const WithDropdownAndStacked: Story = {
  render: () => (
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
  ),
}
