import { Network } from '@dcl/schemas'

export type BarChartProps = {
  data?: Record<number, number>
  height?: number | string
  width?: number | string
  upperBound?: number
  sliderStep?: number
  loading?: boolean
  min: string
  max: string
  network?: Network
  errorMessage?: string
  onChange: (value: [string, string]) => void
}
