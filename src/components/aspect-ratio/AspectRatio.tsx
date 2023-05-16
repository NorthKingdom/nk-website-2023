import { useMemo, forwardRef } from 'react'
import styles from './AspectRatio.module.scss'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
  ratio: number
  minHeight?: string
  maxHeight?: string
}

/**
 * Aspect ratio box component.
 * The component uses a padding trick to achieve the desired aspect ratio.
 * In order to be able to set a specific width and still have the desired aspect ratio, the aspect ratio box is wrapped in another div, which can be set to a specific width.
 */
export const AspectRatio = forwardRef<HTMLDivElement, Props>(
  ({ children, ratio, className, style, minHeight, maxHeight, ...props }: Props, ref) => {
    // Calculate the padding for the aspect ratio box
    // apply min/max height, based on https://github.com/mui/material-ui/blob/2cb9664b16d5a862a3796add7c8e3b088b47acb5/packages/mui-joy/src/AspectRatio/AspectRatio.tsx#L38
    const paddingTop = useMemo(
      () =>
        minHeight || maxHeight
          ? `clamp(${minHeight || '0px'}, calc(100% / (${ratio})), ${maxHeight || '9999px'})`
          : `${Math.round((1 / ratio) * 100)}%`,
      [ratio, minHeight, maxHeight]
    )
    return (
      <div className={className} style={style} {...props} ref={ref}>
        <div className={styles.aspectRatio} style={{ paddingTop: paddingTop }}>
          <div className={styles.aspectRatio__content}>{children}</div>
        </div>
      </div>
    )
  }
)

AspectRatio.displayName = 'AspectRatio'

AspectRatio.defaultProps = {
  className: '',
  style: {},
  ratio: 1,
}
