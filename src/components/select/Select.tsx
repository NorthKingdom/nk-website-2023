import styles from './Select.module.scss'
import { noop } from '@utils/noop'
import cx from 'clsx'
import { ForwardedRef, ReactNode, createContext, forwardRef, useContext, useState } from 'react'

interface SelectRootProps {
  style?: React.CSSProperties
  className?: string
  defaultValue: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}

const SelectContext = createContext<{
  value: any
  setValue: (value: any) => void
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onValueChange: (value: any) => void
}>({
  value: '',
  setValue: noop,
  isOpen: false,
  setIsOpen: noop,
  onValueChange: noop,
})

export const Root = forwardRef(
  (
    { className = '', style = {}, defaultValue, onValueChange = noop, children, ...props }: SelectRootProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [value, setValue] = useState<string>(defaultValue)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
      <SelectContext.Provider value={{ value, setValue, isOpen, setIsOpen, onValueChange }}>
        <div className={className} style={style} ref={ref} {...props}>
          <div onClick={() => setIsOpen((s) => !s)} className={styles['select__currentValue']}>
            {value}
          </div>
          {isOpen && <>{children}</>}
        </div>
      </SelectContext.Provider>
    )
  }
)
Root.displayName = 'Select.Root'

interface SelectItemProps {
  value: any
  children: React.ReactNode
  style?: React.CSSProperties
  disabled?: boolean
  className?: string
}

export const Item = forwardRef(
  (
    { className = '', style = {}, value, children, disabled = false, ...props }: SelectItemProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { setValue, setIsOpen, onValueChange } = useContext(SelectContext)
    const isActive = value === useContext(SelectContext).value

    const handleClick = () => {
      setValue(value)
      setIsOpen(false)
      onValueChange(value)
    }

    return (
      <div
        ref={ref}
        className={cx(styles['select__item'], className)}
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
)
Item.displayName = 'Select.Item'
