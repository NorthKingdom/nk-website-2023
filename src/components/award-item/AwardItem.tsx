import React from 'react'
import styles from './AwardItem.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'awardItem')

interface AwardItemProps {
  awardName: string
  count: number
}

// For the rendering of Awards List
export const AwardItem = ({ awardName, count }: AwardItemProps) => {
  return (
    <div className={styles['awardItem']}>
      <p>{awardName}</p>
      <p>{count}</p>
    </div>
  )
}
