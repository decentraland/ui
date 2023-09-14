export type Item = {
  id: string
  label: string
  children?: Item[]
}

export type Props = {
  title: string
  items: Item[]
  value: string
  onClick?: (id: string) => void
}
