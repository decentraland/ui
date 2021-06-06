import * as React from 'react'
import './WalletIcon.css'

export const WalletIcon = (): JSX.Element => (
  <div className="WalletIcon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="59"
      viewBox="0 0 64 59"
    >
      <path
        fillRule="nonzero"
        d="M64 27.125h-5V10H7.5A2.503 2.503 0 0 1 5 7.5C5 6.121 6.121 5 7.5 5H54V0H7.5C3.365 0 0 3.364 0 7.5v44C0 55.635 3.365 59 7.5 59H59V42.125h5v-15zM54 54H7.5A2.503 2.503 0 0 1 5 51.5V14.57c.782.277 1.624.43 2.5.43H54v12.125h-5.75c-4.135 0-7.5 3.365-7.5 7.5s3.365 7.5 7.5 7.5H54V54zm5-16.875H48.25a2.503 2.503 0 0 1-2.5-2.5c0-1.379 1.121-2.5 2.5-2.5H59v5z"
      />
    </svg>
  </div>
)
