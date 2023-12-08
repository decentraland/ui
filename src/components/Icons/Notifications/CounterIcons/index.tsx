import React from 'react'
import * as Numbers from './Numbers'

type CounterProps = React.SVGAttributes<SVGElement> & {
  count: number
}

const Counter = ({ count, ...rest }: CounterProps) => {
  const Component =
    count <= 9 ? Numbers[`Number${count}`] : Numbers['Number9Plus']

  return <Component {...rest} />
}

export default Counter
