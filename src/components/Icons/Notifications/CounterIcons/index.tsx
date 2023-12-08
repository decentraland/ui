import React from 'react'
import * as Numbers from './Numbers'

type CounterProps = React.SVGAttributes<SVGElement> & {
  count: number
}

const MAX_COUNT = 9

const Counter = ({ count, ...rest }: CounterProps) => {
  if (count <= 0) {
    return null
  }

  const Component = Numbers[`Number${count <= MAX_COUNT ? count : '9Plus'}`]

  return <Component {...rest} />
}

export default Counter
