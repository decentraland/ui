import React from 'react'

export type WrappedAsProps<
  T extends React.ElementType = typeof React.Fragment
> = {
  as?: T
} & { children?: React.ReactNode } & React.ComponentPropsWithoutRef<T>
