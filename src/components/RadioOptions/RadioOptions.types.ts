export type RadioOptionsProps<T extends string | number | undefined> = {
  value: T
  options: { name: string; info?: string; value: T }[]
  onChange: (options: T) => unknown
  className?: string
}
