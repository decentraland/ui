import { useState, useCallback, useEffect, useRef } from 'react'

export const useInput = (
  value: string,
  onChange: (newValue: string) => void,
  ms = 500
) => {
  const [text, setText] = useState(value)
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value),
    [setText]
  )

  const timeout = useRef<ReturnType<typeof setTimeout>>()

  // flag to skip debounce
  const skip = useRef(false)

  // when value is changed from outside (controlled prop)
  // should update internal value and skip debounce
  useEffect(() => {
    if (value !== text) {
      skip.current = true
      setText(value)
    }
    // eslint-disable-next-line
  }, [value])

  // When internal value changes it
  // should start a debounced call to onChange
  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
    if (skip.current) {
      skip.current = false
      return
    }
    timeout.current = setTimeout(() => {
      timeout.current = undefined
      onChange(text)
    }, ms)
  }, [text, ms, onChange])

  return [text, handleChange] as const
}
