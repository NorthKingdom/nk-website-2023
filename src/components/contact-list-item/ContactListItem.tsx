import Link from 'next/link'
import React from 'react'
import { bemify } from '@utils/bemify'
import { ClipboardCopyItem } from '@components/clipboard-copy-item'
import styles from './ContactListItem.module.scss'
import type { LinkPayload, ClipboardCopyItemPayload } from '@customTypes/cms'
const bem = bemify(styles, 'contactListItem')

interface ContactListItemProps {
  title: string
  linksCollection: {
    items: (LinkPayload | ClipboardCopyItemPayload)[]
  }
}

export const ContactListItem = ({ title, linksCollection }: ContactListItemProps) => {
  return (
    <div className={bem()}>
      <p className={bem('header')}>{title}</p>
      <div className={bem('contactsContainer')}>
        {linksCollection.items.map((link) =>
          link.__typename === 'ClipboardCopyItem' ? (
            <ClipboardCopyItem key={link.label} {...link} />
          ) : (
            <Link key={link.copy} href={link.url} target="_blank" className={bem('link')}>
              {link.copy}
            </Link>
          )
        )}
      </div>
    </div>
  )
}
