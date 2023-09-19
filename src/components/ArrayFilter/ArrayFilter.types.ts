export type ArrayFilterOption = { value: string; text: string }

export type ArrayFilterProps = {
  name?: string
  className?: string
  ['data-testid']?: string
  values: string[]
  options: ArrayFilterOption[]
  onChange: (newValues: string[]) => void
}
