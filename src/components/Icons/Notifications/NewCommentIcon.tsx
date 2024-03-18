import React from 'react'

const NewCommentIcon = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="47" height="47" viewBox="0 0 47 47" fill="none" {...props}>
      <circle
        cx="23.5"
        cy="23.5"
        r="23.5"
        fill="url(#paint0_linear_662_7058)"
      />
      <path
        d="M18.3075 32.3125L16.6457 33.4204V32.3125H18.3075Z"
        stroke="white"
        strokeWidth="1.95833"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.6667 13.7083C13.5036 13.7083 11.75 15.6811 11.75 18.1146V26.9271C11.75 29.3606 13.5036 31.3333 15.6667 31.3333H21.7885C21.6273 30.7074 21.5417 30.0512 21.5417 29.375C21.5417 25.0488 25.0488 21.5417 29.375 21.5417C31.7146 21.5417 33.8146 22.5674 35.25 24.1936V18.1146C35.25 15.6811 33.4964 13.7083 31.3333 13.7083H15.6667Z"
        fill="#FCFCFC"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.25 29.375C35.25 32.6197 32.6197 35.25 29.375 35.25C26.1303 35.25 23.5 32.6197 23.5 29.375C23.5 26.1303 26.1303 23.5 29.375 23.5C32.6197 23.5 35.25 26.1303 35.25 29.375ZM30.158 30.1583V33.2917H28.5913V30.1583H25.4582L25.4582 28.5917H28.5913V25.4583H30.158V28.5917H33.2915V30.1583H30.158Z"
        fill="#FCFCFC"
      />
      <defs>
        <linearGradient
          id="paint0_linear_662_7058"
          x1="-1.23684"
          y1="1.23684"
          x2="47"
          y2="47"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#34CE76" />
          <stop offset="1" stopColor="#229754" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default NewCommentIcon
