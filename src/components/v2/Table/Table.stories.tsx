import React from 'react'
import TableContainer from './TableContainer'
import { TableContent } from './TableContent'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'V2/Table',
  component: TableContainer
} as ComponentMeta<typeof TableContainer>

const Template: ComponentStory<typeof TableContainer> = (args) => (
  <TableContainer {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
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
