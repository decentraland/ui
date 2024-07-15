import { Item } from './SideMenuItem'

export type SideMenuProps = {
  items: Item[]
  value: string
  onClick?: (id: string) => void
}
