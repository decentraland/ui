import { Props as CategoryFilterProps, Item } from '../CategoryFilter.types'

export type Props = {
  branch: Set<string>
  value: CategoryFilterProps['value']
  item: Item
  level: number
  onClick: CategoryFilterProps['onClick']
}
