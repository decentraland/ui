import React from 'react'
import classNames from 'classnames'

import './styles.css'

const ChevronIcon = ({ down = false }: { down?: boolean }) => (
  <div
    className={classNames(
      'dui-icon-container',
      'centered',
      down && 'rotate-180'
    )}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6"
    >
      <g fill="none" fillRule="evenodd">
        <path d="M-7 15h24V-9H-7z" />
        <path
          fill={'var(--navbar-icons)'}
          d="M5 0l4.756 4.6a.806.806 0 0 1 .002 1.156.856.856 0 0 1-1.192.003L5 2.317 1.434 5.759a.856.856 0 0 1-1.192-.003A.806.806 0 0 1 .244 4.6L5 0z"
        />
      </g>
    </svg>
  </div>
)

export default ChevronIcon
