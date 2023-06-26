import cx from 'clsx'
import { ForwardedRef, createContext, forwardRef, useContext, useState } from 'react'
import { noop } from '@utils/noop'
import styles from './Filters.module.scss'

interface FilterRootProps {
  style?: React.CSSProperties
  className?: string
  defaultValue: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  as?: React.ElementType
  [key: string]: any
}

const FilterContext = createContext<{
  value: any
  setValue: (value: any) => void
  onValueChange: (value: any) => void
}>({
  value: '',
  setValue: () => {},
  onValueChange: () => {},
})

export const Root = forwardRef(
  (
    { className = '', style = {}, defaultValue, onValueChange = noop, as = 'div', children, ...props }: FilterRootProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [value, setValue] = useState<string>(defaultValue)

    const Tag = as

    return (
      <FilterContext.Provider value={{ value, setValue, onValueChange }}>
        <Tag className={className} style={style} ref={ref} {...props}>
          {children}
        </Tag>
      </FilterContext.Provider>
    )
  }
)
Root.displayName = 'Filters.Root'

interface FilterItemProps {
  value: any
  children: React.ReactNode
  style?: React.CSSProperties
  disabled?: boolean
  className?: string
  as?: React.ElementType
  [key: string]: any
}

export const Item = forwardRef(
  (
    { className = '', style = {}, value, children, disabled = false, as = 'div', ...props }: FilterItemProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { setValue, onValueChange } = useContext(FilterContext)
    const isActive = value === useContext(FilterContext).value

    const Tag = as

    const handleClick = () => {
      setValue(value)
      onValueChange(value)
    }

    return (
      <Tag
        ref={ref}
        className={cx(styles.filterItem, className)}
        style={style}
        onClick={handleClick}
        data-active={isActive}
        data-disabled={disabled}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)
Item.displayName = 'Filters.Item'
