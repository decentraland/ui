import { Item } from '../SideMenu/SideMenuItem'

export type CategoryFilterProps = {
  i18n: {
    title: string
  }
  items: Item[]
  value: string
  className?: string
  onClick?: (id: string) => void
}
