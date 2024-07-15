import React from 'react'

import './styles.css'
const BookmarkedIcon = () => (
  <div className="iconContainer">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Icon/outline/lightmode/bookmarkdefault">
        <mask
          id="mask0_68_24921"
          maskUnits="userSpaceOnUse"
          x="5"
          y="3"
          width="15"
          height="19"
        >
          <path
            id="Mask"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.8215 15.506C11.9905 15.506 12.1605 15.549 12.3135 15.635L17.0005 18.286V5.334C17.0005 5.133 16.8795 5 16.8005 5H7.20049C7.12049 5 7.00049 5.133 7.00049 5.334V18.234L11.3065 15.649C11.4655 15.554 11.6435 15.506 11.8215 15.506ZM6.00049 21C5.83049 21 5.66049 20.957 5.50749 20.87C5.19449 20.693 5.00049 20.36 5.00049 20V5.334C5.00049 4.047 5.98749 3 7.20049 3H16.8005C18.0135 3 19.0005 4.047 19.0005 5.334V20C19.0005 20.356 18.8115 20.685 18.5045 20.864C18.1965 21.044 17.8185 21.047 17.5085 20.871L11.8365 17.663L6.51449 20.858C6.35649 20.952 6.17849 21 6.00049 21Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_68_24921)">
          <rect id="Base" width="24" height="24" fill={'var(--navbar-icons)'} />
        </g>
      </g>
    </svg>
  </div>
)

export default BookmarkedIcon
