import * as React from 'react'

export type Props = {
  i18n?: {
    title?: React.ReactNode
    content?: React.ReactNode
    action?: React.ReactNode
  }
  onSwitchNetwork: () => unknown
}
