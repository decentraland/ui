import { Network } from '@dcl/schemas'

export type BarChartSource = 'input' | 'slider' | 'chart'

export type BarChartProps = {
  data?: Record<number, number>
  height?: number | string
  width?: number | string
  upperBound?: number
  rangeDecimals?: number
  sliderStep?: number
  loading?: boolean
  min: string
  max: string
  network?: Network
  isMana?: boolean
  minLabel?: string
  maxLabel?: string
  errorMessage?: string
  id?: string
  onChange: (value: [string, string], source: BarChartSource) => void
}
