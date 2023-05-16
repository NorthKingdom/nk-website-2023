import React from 'react'
import styles from './JobListItem.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'jobListItem')

interface JobListItemProps {
  title: string
  location: string
  link: string
  description?: string
}

export const JobListItem = ({ title, location, link, description }: JobListItemProps) => {
  return (
    <div className={styles['jobListItem']}>
      <div className={bem('topRow')}>
        <p>{title}</p>
        <p>{location}</p>
        <a href={link} target="_blank">
          Apply
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
