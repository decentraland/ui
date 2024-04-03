import React from 'react'

import classNames from 'classnames'

import './LoadingText.css'

export type LoadingTextProps = {
  type: 'span' | 'h1' | 'h2' | 'h3' | 'p'
  size: 'small' | 'medium' | 'large' | 'full'
  className?: string
  lines?: number
}

export default React.memo(function LoadingText(props: LoadingTextProps) {
  const { type, size, lines, className: classNameProps } = props
  return (
    <>
      {Array.from(Array(lines || 1), (_, index) => (
        <div
          key={index}
          className={classNames([
            'loading-text',
            classNameProps,
            type,
            size === 'small' && 'loading-text__small',
            size === 'medium' && 'loading-text__medium',
            size === 'large' && 'loading-text__large',
            size === 'full' && 'loading-text__full'
          ])}
        />
      ))}
    </>
  )
})
