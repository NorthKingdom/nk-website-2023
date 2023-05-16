import React from 'react'
import styles from './PlayButton.module.scss'
import cx from 'clsx'

interface PlayButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string
  style?: React.CSSProperties
}

export const PlayButton = ({ className = '', style = {}, ...props }: PlayButtonProps) => {
  return (
    <button className={cx(styles['playButton'], className)} style={style} aria-label="play button" {...props}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 19V5L20 12L6 19Z" fill="white" fillOpacity="0.9" />
      </svg>
    </button>
  )
}
