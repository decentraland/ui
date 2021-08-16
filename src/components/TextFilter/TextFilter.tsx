import * as React from 'react'
import { Header } from '../Header/Header'
import { useInput } from '../../hooks/input'
import './TextFilter.css'

export type TextFilterProps = {
  label?: string
  placeholder?: string
  value: string
  onChange: (newValue: string) => void
}

export const TextFilter = (props: TextFilterProps) => {
  const { label, value, placeholder, onChange } = props

  const [text, setText] = useInput(value, onChange)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="dcl text-filter">
      {label ? (
        <Header sub className="name">
          {label}
        </Header>
      ) : null}
      <div className="text-input">
        <input
          ref={inputRef}
          value={text}
          onChange={setText}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}
