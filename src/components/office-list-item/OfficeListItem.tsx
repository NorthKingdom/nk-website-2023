import React from 'react'
import styles from './OfficeListItem.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'officeListItem')

interface OfficeListItemProps {
  officeName: string
  addressLineOne: string
  addressLineTwo: string
  country: string
  directionsLink: string
}

export const OfficeListItem = ({
  officeName,
  addressLineOne,
  addressLineTwo,
  country,
  directionsLink,
}: OfficeListItemProps) => {
  return (
    <div className={styles['officeListItem']}>
      <h2 className={bem('officeName')}>{officeName}</h2>
      <div className={bem('addressContainer')}>
        <p>{addressLineOne}</p>
        <p>{addressLineTwo}</p>
        <p>{country}</p>
        <a className={bem('directionsLink')} href={directionsLink} target="_blank">
          ↗ Directions
        </a>
      </div>
    </div>
  )
}
