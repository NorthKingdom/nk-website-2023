import React from 'react'
import cx from 'clsx'
import { noop } from '@utils/noop'
import styles from './HeaderLogo.module.scss'
import { bemify } from '@utils/bemify'
import Link from 'next/link'

const bem = bemify(styles, 'headerLogo')

interface HeaderLogoProps {
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export const HeaderLogo = ({ className, style, onClick = noop }: HeaderLogoProps) => {
  return (
    <div className={cx(bem(''), className)} style={style}>
      <Link href={`/`} legacyBehavior onClick={onClick}>
        <a>
          <svg viewBox="0 0 66 86" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect
              x="10"
              y="10"
              width="46"
              height="60"
              className={bem('shieldFg')}
              fill={'#ffffff'}
              style={{
                transition: 'fill 0.3s',
              }}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              className={bem('shieldBg')}
              d="M0 5.51751L33 0L66 5.50344V70.2497L33 86L0 70.2638V5.51751ZM43.784 44.1671H52.1836V30.6887H45.6156V23.6323H41.2437V30.6912H37.1263V17.3509H23.2816C21.7219 17.3509 19.9502 17.4323 18.5078 18.153C17.063 18.8737 15.9301 19.9523 15.1091 21.4184C14.2382 22.9412 13.814 24.7109 13.814 26.7323V44.1697H22.2385V26.0955C22.2385 22.2477 23.3065 20.093 25.4825 19.7573C26.054 19.6685 28.6966 19.6857 28.6966 19.6857V20.7248V22.2946V62.614H32.0255L37.1311 57.8012V34.2576H43.784V44.1671Z"
              fill={'#050311'}
            />
          </svg>
        </a>
      </Link>
    </div>
  )
}
