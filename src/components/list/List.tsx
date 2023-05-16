import React, { ForwardedRef, forwardRef } from 'react'
import styles from './List.module.scss'
import { bemify } from '@utils/bemify'
import cx from 'clsx'
const bem = bemify(styles, 'list')

interface ListProps {
  className?: string
  style?: React.CSSProperties
  items: any[]
  id?: (item: any) => string
  renderItem: (item: any) => JSX.Element
  hideBottomBar?: boolean
}

export const List = forwardRef(
  (
    { items = [], renderItem, style = {}, className = '', id, hideBottomBar = false }: ListProps,
    ref: ForwardedRef<HTMLUListElement>
  ) => {
    return (
      <ul ref={ref} data-no-bottom-bar={hideBottomBar} className={cx(bem(), className)} style={style}>
        {items.map((item, i) => (
          <li key={!!id ? id(item) : i}>{renderItem(item)}</li>
        ))}
      </ul>
    )
  }
)
List.displayName = 'List'
