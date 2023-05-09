import React from 'react'
import styles from './Description.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'description')

interface DescriptionProps {}

export const Description = (props: DescriptionProps) => {
  return (
    <section className={styles['description']}>
      <div className={bem('left')}>left</div>
      <div className={bem('right')}>right</div>
      <div>test</div>
    </section>
  )
}
