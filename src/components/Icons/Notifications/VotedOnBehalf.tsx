import React from 'react'

function VotedOnBehalf() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
    >
      <circle
        cx="24"
        cy="24"
        r="24"
        fill="url(#paint0_linear_17208_1928)"
      ></circle>
      <g clipPath="url(#clip0_17208_1928)">
        <path
          fill="#fff"
          d="M17.5 18a6 6 0 1012 0 6 6 0 00-12 0zm4.43 9.384l.872 1.453-1.561 5.808-1.688-6.886c-.094-.38-.46-.628-.839-.53A7.56 7.56 0 0013 34.562c0 .797.647 1.439 1.44 1.439H32.56A1.44 1.44 0 0034 34.56a7.56 7.56 0 00-5.714-7.33c-.38-.094-.745.154-.84.53l-1.687 6.885-1.56-5.808.871-1.453a.749.749 0 00-.642-1.134h-1.851a.75.75 0 00-.643 1.134h-.004z"
        ></path>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_17208_1928"
          x1="0"
          x2="48"
          y1="0"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D80027"></stop>
          <stop offset="1" stopColor="#720015"></stop>
        </linearGradient>
        <clipPath id="clip0_17208_1928">
          <path
            fill="#fff"
            d="M0 0H21V24H0z"
            transform="translate(13 12)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  )
}

export default VotedOnBehalf
