import React from 'react'
import styles from './ContactListItem.module.scss'
import { bemify } from '@utils/bemify'
import type { Link as LinkType, ClipboardCopyItem as ClipboardCopyItemType } from '@customTypes/cms'
import Link from 'next/link'
import { ClipboardCopyItem } from '@components/clipboard-copy-item'
const bem = bemify(styles, 'contactListItem')

interface ContactListItemProps {
  title: string
  linksCollection: {
    items: (LinkType | ClipboardCopyItemType)[]
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
