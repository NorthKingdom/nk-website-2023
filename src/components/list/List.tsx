import React from 'react'
import styles from './List.module.scss'
import { bemify } from '@utils/bemify'
import cx from 'clsx'
const bem = bemify(styles, 'list')

interface ListProps<T> {
  className?: string
  style?: React.CSSProperties
  items: T[]
  id?: (item: T) => string
  renderItem: (item: T) => JSX.Element
}

export const List = <T extends {}>({ items = [], renderItem, style = {}, className = '', id }: ListProps<T>) => {
  return (
    <ul className={cx(bem(), className)} style={style}>
      {items.map((item, i) => (
        <li key={!!id ? id(item) : i}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}
