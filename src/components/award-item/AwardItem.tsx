import React from 'react'
import styles from './AwardItem.module.scss'
import type { AwardPayload } from '@customTypes/cms'

// For the rendering of Awards List
export const AwardItem = ({ awardName, count }: AwardPayload) => {
  return (
    <div className={styles['awardItem']}>
      <p>{awardName}</p>
      <p>{count}</p>
    </div>
  )
}
