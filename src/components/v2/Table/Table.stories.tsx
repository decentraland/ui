import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Icon, Popup } from 'semantic-ui-react'
import TableContainer from './TableContainer'
import { TableContent } from './TableContent'

const meta: Meta<typeof TableContainer> = {
  title: 'V2/Table',
  component: TableContainer
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    children: (
      <TableContent
        data={[
          { column1: 'test1', column2: <span>TEST 1</span> },
          {
            column1: 'test2',
            column2: (
              <div>
                TEST<strong>2</strong>
              </div>
            )
          }
        ]}
        activePage={1}
        isLoading={false}
        setPage={() => console.log('setPage')}
        totalPages={2}
        empty={() => null}
        total={10}
        hasHeaders
      />
    ),
    tabsList: [
      { displayValue: 'Tab1', value: 'tab1' },
      { displayValue: 'Tab2', value: 'tab2' }
    ],
    sortbyList: [],
    handleSortByChange: (value: string) => console.log('sortBy', value),
    sortBy: ''
  }
}

export const CustomHeaders: Story = {
  args: {
    children: (
      <TableContent
        data={[
          { column1: 'test1', column2: <span>TEST 1</span> },
          {
            column1: 'test2',
            column2: (
              <div>
                TEST<strong>2</strong>
              </div>
            )
          }
        ]}
        customHeaders={{
          column1: 'My Column 1',
          column2: (
            <span>
              Col 2
              <Popup
                content="this is column 2 tooltip"
                trigger={<Icon name="info circle" />}
                on="hover"
              />
            </span>
          )
        }}
        activePage={1}
        isLoading={false}
        setPage={() => console.log('setPage')}
        totalPages={2}
        empty={() => null}
        total={10}
        hasHeaders
      />
    ),
    tabsList: [
      { displayValue: 'Tab1', value: 'tab1' },
      { displayValue: 'Tab2', value: 'tab2' }
    ],
    sortbyList: [],
    handleSortByChange: (value: string) => console.log('sortBy', value),
    sortBy: ''
  }
}
