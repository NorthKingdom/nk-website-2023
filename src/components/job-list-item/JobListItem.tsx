import React from 'react'
import styles from './JobListItem.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'jobListItem')

interface JobListItemProps {
  title: string
  location: string
  link: string
}

export const JobListItem = ({ title, location, link }: JobListItemProps) => {
  return (
    <div className={styles['jobListItem']}>
      <p>{title}</p>

      <p>{location}</p>
      <a href={link} target="_blank">
        Apply
      </a>
    </div>
  )
}
