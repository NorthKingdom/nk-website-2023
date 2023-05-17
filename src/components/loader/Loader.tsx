import React from 'react'
import styles from './Loader.module.scss'
import { bemify } from '@utils/bemify'
import cx from 'clsx'
const bem = bemify(styles, 'loader')

interface LoaderProps {
  className?: string
  style?: React.CSSProperties
}

export const Loader = ({ className = '', style = {} }: LoaderProps) => {
  return (
    <svg
      className={cx(bem(''), className)}
      style={style}
      viewBox="0 0 103 138"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#clip0_1_112)">
        <path
          className={bem('bg')}
          d="M51.5 0L0 8.84467V112.731L51.5 138L103 112.731V8.84467L51.5 0ZM81.7969 71.0404H68.5278V55.0706H58.0177V93.0139L49.9601 100.772H44.704V31.5796C44.704 31.5796 40.532 31.5527 39.629 31.6949C36.1925 32.2339 34.5074 35.7102 34.5074 41.9114V71.0404H21.2018V42.9363C21.2018 39.6784 21.8698 36.8261 23.2483 34.3726C24.5464 32.0068 26.3342 30.2704 28.6178 29.1094C30.9014 27.9484 33.6935 27.8163 36.1567 27.8163H58.0177V49.3161H64.5178V37.9439H71.4205V49.3161H81.7942L81.7969 71.0404Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_112">
          <rect className={bem('fg')} width="103" height="138" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
