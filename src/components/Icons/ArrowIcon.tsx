import React from 'react'
import classNames from 'classnames'

import './styles.css'

const ArrowIcon = () => (
  <div className={classNames('dui-icon-container', 'centered')}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="16"
      viewBox="0 0 19 16"
      fill="none"
    >
      <path
        fill={'var(--navbar-icons)'}
        d="M10.303 15.8894L8.94081 14.5416L14.5763 8.92003H0.016949L0.021785 6.96933L14.5812 6.96933L8.97347 1.36549L10.3424 0L18.2674 7.94468L10.303 15.8894Z"
      />
    </svg>
  </div>
)

export default ArrowIcon
