import React, { ForwardedRef, forwardRef } from 'react'
import cx from 'clsx'
import { bemify } from '@utils/bemify'
import styles from './List.module.scss'
const bem = bemify(styles, 'list')

interface ListProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'id'> {
  className?: string
  style?: React.CSSProperties
  items: any[]
  id?: (item: any) => string
  renderItem: (item: any) => JSX.Element
  hideBottomBar?: boolean
  hideAllBars?: boolean
}

export const List = forwardRef(
  (
    {
      items = [],
      renderItem,
      style = {},
      className = '',
      id,
      hideBottomBar = false,
      hideAllBars = false,
      ...props
    }: ListProps,
    ref: ForwardedRef<HTMLUListElement>
  ) => {
    return (
      <ul
        ref={ref}
        data-no-bottom-bar={hideBottomBar}
        data-no-bars={hideAllBars}
        className={cx(bem(), className)}
        style={style}
        {...props}
      >
        {items.map((item, i) => (
          <li key={!!id ? id(item) : i}>{renderItem(item)}</li>
        ))}
      </ul>
    )
  }
)
List.displayName = 'List'
