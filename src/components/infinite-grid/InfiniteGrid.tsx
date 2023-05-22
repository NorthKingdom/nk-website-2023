import React, { useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import styles from './InfiniteGrid.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'infiniteGrid')

interface InfiniteGridProps {}

const num_cols = 9
const num_rows = 9
const col_size = 240
const row_size = 240
const square_size = 240

const Square = ({ i, w, h, row, col }: { i: number; w: number; h: number; row: number; col: number }) => {
  const x = (i % num_cols) * col_size
  const y = Math.floor(i / num_rows) * row_size

  return (
    <motion.div
      className={`${bem('square')} ${`row-${row}`} ${`col-${col}`}`}
      style={{
        x,
        y,
        transform: `translateX(${x}px) tranlateY(${y}px) translateZ(0px)`,
        width: w,
        height: h,
      }}
    >
      <img src={`/dummy/grid/grid-image-${i % 31}.jpg`} alt={'temp alt'} draggable="false" />
    </motion.div>
  )
}

export const InfiniteGrid = (props: InfiniteGridProps) => {
  const ref = useRef(null)
  const [w, setW] = useState(col_size)
  const [h, setH] = useState(row_size)

  let isMouseDown = false

  let prevPageX = 0
  let prevPageY = 0

  let maxTargetHitY = square_size
  let minTargetHitY = -1 * square_size

  let maxTargetHitX = square_size
  let minTargetHitX = -1 * square_size

  let maxRowNumber = num_rows - 1
  let minRowNumber = 0

  let maxColNumber = num_cols - 1
  let minColNumber = 0

  // Setting them as 'any' otherwise it says: "Property 'current' does not exist on type 'MotionValue<number>'"
  const x = useMotionValue(0) as any
  const y = useMotionValue(0) as any

  const mouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    isMouseDown = true
    prevPageX = e.pageX
    prevPageY = e.pageY
  }

  const mouseUp = () => {
    isMouseDown = false
  }

  const mouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isMouseDown) {
      const movedX = e.pageX - prevPageX
      const movedY = e.pageY - prevPageY
      let lastRowEls = []
      let lastColEls = []

      x.set(x.current + movedX)
      y.set(y.current + movedY)
      prevPageX = e.pageX
      prevPageY = e.pageY

      if (y.current > maxTargetHitY) {
        lastRowEls = [...document.querySelectorAll(`.row-${maxRowNumber}`)] as HTMLElement[]

        lastRowEls.forEach((item) => {
          let currentTransform =
            item.style.transform === 'none' ? `translateX(0px) translateY(0px) translateZ(0px)` : item.style.transform

          const newTranslateY = minRowNumber * row_size - square_size

          const newTransform = currentTransform.replace(
            /translateY\((-?\d+\.?\d*)px\)/i,
            `translateY(${newTranslateY}px)`
          )

          item.style.transform = newTransform
        })
        maxTargetHitY += square_size
        minTargetHitY += square_size
        maxRowNumber--
        minRowNumber--
        lastRowEls.forEach((item) => {
          item.classList.remove(`row-${maxRowNumber + 1}`)
          item.classList.add(`row-${minRowNumber}`)
        })
      } else if (y.current < minTargetHitY) {
        lastRowEls = [...document.querySelectorAll(`.row-${minRowNumber}`)] as HTMLElement[]

        lastRowEls.forEach((item) => {
          let currentTransform =
            item.style.transform === 'none' ? `translateX(0px) translateY(0px) translateZ(0px)` : item.style.transform

          const newTranslateY = maxRowNumber * row_size + square_size

          const newTransform = currentTransform.replace(
            /translateY\((-?\d+\.?\d*)px\)/i,
            `translateY(${newTranslateY}px)`
          )

          item.style.transform = newTransform
        })
        minTargetHitY -= square_size
        maxTargetHitY -= square_size
        maxRowNumber++
        minRowNumber++
        lastRowEls.forEach((item) => {
          item.classList.remove(`row-${minRowNumber - 1}`)
          item.classList.add(`row-${maxRowNumber}`)
        })
      }

      if (x.current > maxTargetHitX) {
        lastColEls = [...document.querySelectorAll(`.col-${maxColNumber}`)] as HTMLElement[]

        lastColEls.forEach((item) => {
          let currentTransform =
            item.style.transform === 'none' ? `translateX(0px) translateY(0px) translateZ(0px)` : item.style.transform

          const newTranslateX = minColNumber * col_size - square_size

          const newTransform = currentTransform.replace(
            /translateX\((-?\d+\.?\d*)px\)/i,
            `translateX(${newTranslateX}px)`
          )

          item.style.transform = newTransform
        })
        maxTargetHitX += square_size
        minTargetHitX += square_size
        maxColNumber--
        minColNumber--
        lastColEls.forEach((item) => {
          item.classList.remove(`col-${maxColNumber + 1}`)
          item.classList.add(`col-${minColNumber}`)
        })
      } else if (x.current < minTargetHitX) {
        lastColEls = [...document.querySelectorAll(`.col-${minColNumber}`)] as HTMLElement[]

        lastColEls.forEach((item) => {
          let currentTransform =
            item.style.transform === 'none' ? `translateX(0px) translateY(0px) translateZ(0px)` : item.style.transform

          const newTranslateX = maxColNumber * col_size + square_size

          const newTransform = currentTransform.replace(
            /translateX\((-?\d+\.?\d*)px\)/i,
            `translateX(${newTranslateX}px)`
          )

          item.style.transform = newTransform
        })
        minTargetHitX -= square_size
        maxTargetHitX -= square_size
        maxColNumber++
        minColNumber++
        lastColEls.forEach((item) => {
          item.classList.remove(`col-${minColNumber - 1}`)
          item.classList.add(`col-${maxColNumber}`)
        })
      }
    }
  }

  return (
    <div className={styles['infiniteGrid']} onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove}>
      <motion.div
        className={bem('grid')}
        ref={ref}
        style={{
          x,
          y,
        }}
      >
        {Array.from(Array(num_cols * num_rows)).map((a, i) => {
          return <Square col={i % num_cols} row={Math.floor(i / num_rows)} w={w} h={h} key={`sq-${i}`} i={i} />
        })}
      </motion.div>
    </div>
  )
}
