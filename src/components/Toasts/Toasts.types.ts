import * as React from 'react'

export type ToastPosition =
  | 'bottom left'
  | 'bottom right'
  | 'top left'
  | 'top right'

export type Props = {
  position?: ToastPosition
  children: React.ReactNode
}
