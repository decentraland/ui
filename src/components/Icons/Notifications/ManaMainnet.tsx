import React from 'react'

const ManaMainnet = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_32_9725)" />
      <path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M12 5L19 12L12 19L5 12L12 5ZM12 6.96L17.04 12L12 17.04L6.96 12L12 6.96ZM12 14.52C12.6683 14.5201 13.3093 14.2547 13.782 13.7821C14.2546 13.3096 14.5202 12.6686 14.5203 12.0003C14.5204 11.3319 14.2549 10.6909 13.7824 10.2183C13.3099 9.74565 12.6689 9.48008 12.0006 9.48C11.3322 9.48 10.6913 9.7455 10.2187 10.2181C9.74608 10.6907 9.48058 11.3317 9.48058 12C9.48058 12.6683 9.74608 13.3093 10.2187 13.7819C10.6913 14.2545 11.3317 14.52 12 14.52Z"
        fill="#FCFCFC"
      />
      <defs>
        <linearGradient
          id="paint0_linear_32_9725"
          x1="-0.631579"
          y1="0.631579"
          x2="24"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#34CE76" />
          <stop offset="1" stopColor="#229754" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default ManaMainnet
