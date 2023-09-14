import { Props as CategoryFilterProps, Item } from '../CategoryFilter.types'

export type Props = {
  item: Item
  level: number
  branch: Set<string>
  value: CategoryFilterProps['value']
  onClick: CategoryFilterProps['onClick']
}
