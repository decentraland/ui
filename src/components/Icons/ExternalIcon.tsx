import React from 'react'
import classNames from 'classnames'

import './styles.css'

const ExternalIcon = () => (
  <div className={classNames('dui-icon-container', 'centered')}>
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.7158 11.9549L11.7997 11.9674L11.7997 4.00746L1.51738 14.3152L0.139735 12.9342L10.422 2.62639L2.49426 2.63894L2.49426 0.705449H13.7158L13.7158 11.9549Z"
        fill={'var(--navbar-icons)'}
      />
    </svg>
  </div>
)

export default ExternalIcon
