import React from 'react'
import { noop } from '@utils/noop'

interface ArrowProps {
  className?: string
  style?: React.CSSProperties
  direction: 'left' | 'right'
  fill?: string
  onClick?: () => void
}

export const Arrow = ({
  direction = 'right',
  fill = '#000',
  className = '',
  style = {},
  onClick = noop,
}: ArrowProps) => {
  return (
    <svg
      width="28"
      height="49"
      viewBox="0 0 28 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        transform: direction === 'right' ? `rotateZ(180deg)` : ``,
        ...style,
      }}
      onClick={onClick}
      tabIndex={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5 35C15.4072 35 14.0096 33.6096 14.0001 31.5216H14V28.0158H10.5004C8.40038 28.0158 7.00039 26.6158 7.00039 24.5158V24.5C7.00039 22.4 8.40038 21 10.5004 21H14V17.5081H14L14 17.5C14 15.4 15.4 14 17.5 14H21V10.5C21 8.4 22.4 7 24.5 7H28V0H21V3.5C21 5.6 19.6 7 17.5 7H14V10.5C14 12.6 12.6 14 10.5 14H7V17.5C7 19.6 5.6 21 3.5 21H3.8147e-06V28H3.5C5.6 28 7 29.4 7 31.5V35H10.5C12.6 35 14 36.4 14 38.5V42H17.5C19.6 42 21 43.4 21 45.5V49H28V42H24.5C22.4 42 21 40.6 21 38.5V35H17.5Z"
        fill={fill}
      />
    </svg>
  )
}
