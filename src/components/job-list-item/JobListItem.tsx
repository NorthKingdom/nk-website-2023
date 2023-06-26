import React from 'react'
import { bemify } from '@utils/bemify'
import styles from './JobListItem.module.scss'
const bem = bemify(styles, 'jobListItem')

interface JobListItemProps {
  title: string
  locations: string[]
  url: string
  description?: string
}

export const JobListItem = ({ title, locations, url, description }: JobListItemProps) => {
  return (
    <div className={styles['jobListItem']}>
      <div className={bem('topRow')}>
        <p className={bem('title')}>{title}</p>
        <p className={bem('location')}>{locations.sort().join('/')}</p>
        <a className={bem('applyLink')} href={url} target="_blank">
          <span className={bem('applyCaption')}>Apply</span> ↗
        </a>
      </div>
      {description && (
        <div className={bem('descriptionContainer')}>
          <p className={bem('description')}>{description}</p>
        </div>
      )}
    </div>
  )
}
