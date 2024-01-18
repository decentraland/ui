import { DropdownItemProps } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/DropdownItem'
import React, { RefObject } from 'react'

export type Props = {
  children: React.ReactNode
  ref: RefObject<HTMLDivElement>
  tabsList: { displayValue: string; value: string }[]
  activeTab?: string
  handleTabChange?: (tab: string) => void
  sortbyList?: DropdownItemProps[]
  handleSortByChange?: (value: string) => void
  sortBy?: string
}
