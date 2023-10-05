import { SideMenuProps as SideMenuProps } from '../SideMenu.types'

export type Item = {
  id: string
  label: string
  children?: Item[]
}

export type SideMenuItemProps = {
  item: Item
  level: number
  branch: Set<string>
  value: SideMenuProps['value']
  onClick: SideMenuProps['onClick']
}
