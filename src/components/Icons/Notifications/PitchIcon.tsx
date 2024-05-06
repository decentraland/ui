import React from 'react'

const PitchIcon = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="24" cy="24" r="24" fill="url(#paint0_linear_2576_13)" />
      <path
        d="M16.6961 21.9922L13 28.3259V16.6668C13 15.1959 14.1959 14 15.6668 14H20.563C21.2714 14 21.9506 14.2792 22.4506 14.7792L23.5549 15.8835C24.0549 16.3835 24.7341 16.6627 25.4425 16.6627H30.3345C31.8054 16.6627 33.0013 17.8586 33.0013 19.3295V20.6629H19.0004C18.0503 20.6629 17.1753 21.1671 16.6961 21.988V21.9922ZM17.8461 22.6631C18.0878 22.2505 18.5254 22.0005 19.0004 22.0005H35.6681C36.1473 22.0005 36.5849 22.2547 36.8224 22.6714C37.0599 23.0881 37.0599 23.5965 36.8182 24.009L32.1512 32.0095C31.9137 32.4179 31.4762 32.6679 31.0012 32.6679H14.3334C13.8542 32.6679 13.4167 32.4137 13.1792 31.997C12.9417 31.5803 12.9417 31.0719 13.1833 30.6594L17.8503 22.6589L17.8461 22.6631Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2576_13"
          x1="0"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#D80027" />
          <stop offset="1" stop-color="#720015" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default PitchIcon
