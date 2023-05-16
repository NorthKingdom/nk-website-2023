import { noop } from '@utils/noop'
import cx from 'clsx'
import styles from './Filters.module.scss'
import { createContext, useContext, useState } from 'react'

interface FilterRootProps {
  style: React.CSSProperties
  className?: string
  defaultValue: string
  onValueChange: (value: string) => void
  children: React.ReactNode
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

export const Root = ({ className = '', style = {}, defaultValue, onValueChange = noop, children }: FilterRootProps) => {
  const [value, setValue] = useState<string>(defaultValue)

  return (
    <FilterContext.Provider value={{ value, setValue, onValueChange }}>
      <div className={className} style={style}>
        {children}
      </div>
    </FilterContext.Provider>
  )
}

interface FilterItemProps {
  value: any
  children: React.ReactNode
  style?: React.CSSProperties
  disabled?: boolean
  className?: string
}

export const Item = ({ className = '', style = {}, value, children, disabled = false, ...props }: FilterItemProps) => {
  const { setValue, onValueChange } = useContext(FilterContext)
  const isActive = value === useContext(FilterContext).value

  const handleClick = () => {
    setValue(value)
    onValueChange(value)
  }

  return (
    <div
      className={cx(styles.filterItem, className)}
      style={style}
      onClick={handleClick}
      data-active={isActive}
      data-disabled={disabled}
      {...props}
    >
      {children}
    </div>
  )
}
