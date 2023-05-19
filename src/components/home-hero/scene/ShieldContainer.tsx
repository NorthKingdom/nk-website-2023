import { forwardRef } from 'react'

interface ShieldContainerProps {
  children: React.ReactNode
  [key: string]: any
}

export const ShieldContainer = forwardRef(
  ({ children, ...props }: ShieldContainerProps, ref: React.Ref<THREE.Group>) => {
    return (
      <group ref={ref} {...props}>
        {children}
      </group>
    )
  }
)
ShieldContainer.displayName = 'ShieldContainer'
