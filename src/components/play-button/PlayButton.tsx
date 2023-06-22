import React from 'react'
import cx from 'clsx'
import styles from './PlayButton.module.scss'

interface PlayButtonProps {
  as?: React.ElementType
  className?: string
  style?: React.CSSProperties
  [key: string]: any
}

export const PlayButton = ({ as = 'button', className = '', style = {}, ...props }: PlayButtonProps) => {
  const Tag = as
  return (
    <Tag className={cx(styles['playButton'], className)} style={style} aria-label="play button" {...props}>
      <svg
        className={styles['playButton__icon']}
        aria-hidden="true"
        focusable="false"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.49316 18.5071L7.49316 5.49304L18.5072 12L7.49316 18.5071Z" fill="black" />
      </svg>
    </Tag>
  )
}
