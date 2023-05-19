import React from 'react'
import styles from './ContactListItem.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'contactListItem')

interface ContactListItemProps {
  header: string
  information: string
}

export const ContactListItem = ({ header, information }: ContactListItemProps) => {
  return (
    <div className={styles['contactListItem']}>
      <p className={bem('header')}>{header}</p>
      {/* TODO :: Miha - copy the 'copy email' from old nk.com */}
      <p className={bem('information')}>{information}</p>
    </div>
  )
}
