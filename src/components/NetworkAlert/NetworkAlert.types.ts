import * as React from 'react'

export type Props = {
  title?: React.ReactNode
  content?: React.ReactNode
  action?: React.ReactNode
  onSwitchNetwork: () => unknown
}
