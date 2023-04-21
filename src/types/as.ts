import React from 'react'

export type WrappedAsProps<
  T extends React.ElementType = typeof React.Fragment
> = {
  as?: T
} & React.PropsWithChildren<T> &
  React.ComponentPropsWithoutRef<T>
