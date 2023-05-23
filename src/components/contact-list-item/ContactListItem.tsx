import React from 'react'
import styles from './ContactListItem.module.scss'
import { bemify } from '@utils/bemify'
import { Link } from '@customTypes/cms'
const bem = bemify(styles, 'contactListItem')

interface ContactListItemProps {
  title: string
  linksCollection: {
    items: Link[]
  }
}

export const ContactListItem = ({ title, linksCollection }: ContactListItemProps) => {
  return (
    <div className={styles['contactListItem']}>
      <p className={bem('header')}>{title}</p>
      <div className={bem('contactsContainer')}>
        {/* TODO :: Miha - copy the 'copy email' from old nk.com */}
        {linksCollection.items.map((link) => (
          <a href={link.url} target="_blank">
            {link.copy}
          </a>
        ))}
      </div>
    </div>
  )
}
