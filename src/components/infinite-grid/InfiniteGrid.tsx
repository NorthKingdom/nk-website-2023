import React, { useEffect, useRef, useState } from 'react'
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

const IS_DEBUG = true

const Square = ({
  i,
  w,
  h,
  row,
  col,
  debug,
  onClick,
}: {
  i: number
  w: number
  h: number
  row: number
  col: number
  debug: boolean
  onClick: any
}) => {
  const x = (i % num_cols) * col_size
  const y = Math.floor(i / num_rows) * row_size

  const scale = useMotionValue(1) as any

  return (
    <motion.div
      onClick={() => {
        // scale.set(scale.current === 2 ? 1 : 2)
        onClick(i)
      }}
      className={`${bem('square')} ${`row-${row}`} ${`col-${col}`} item`}
      style={{
        x,
        y,
        scale,
        border: debug ? `2px solid black` : 'none',
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
  const infiniteGridRef = useRef<HTMLDivElement>(null)
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

  const scale = useMotionValue(1) as any

  const mouseDown = (e: any) => {
    isMouseDown = true
    prevPageX = e.pageX
    prevPageY = e.pageY
  }

  const mouseUp = () => {
    isMouseDown = false
  }

  const mouseMove = (e: any) => {
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

  useEffect(() => {
    if (infiniteGridRef.current) {
      console.log(`adding`)
      infiniteGridRef.current.addEventListener('mousedown', mouseDown)
      infiniteGridRef.current.addEventListener('mouseup', mouseUp)
      infiniteGridRef.current.addEventListener('mousemove', mouseMove)
      infiniteGridRef.current.addEventListener('touchstart', mouseDown)
      infiniteGridRef.current.addEventListener('touchend', mouseUp)
      infiniteGridRef.current.addEventListener('touchmove', mouseMove)
    }

    return () => {
      if (infiniteGridRef.current) {
        infiniteGridRef.current.removeEventListener('mousedown', mouseDown)
        infiniteGridRef.current.removeEventListener('mouseup', mouseUp)
        infiniteGridRef.current.removeEventListener('mousemove', mouseMove)
        infiniteGridRef.current.removeEventListener('touchstart', mouseDown)
        infiniteGridRef.current.removeEventListener('touchend', mouseUp)
        infiniteGridRef.current.removeEventListener('touchmove', mouseMove)
      }
    }
  }, [infiniteGridRef])

  const clickEvent = (i: number) => {
    // console.log(`element ${i} was clicked`)
    // const allElements = [...document.querySelectorAll(`.item`)] as HTMLElement[]
    // allElements.forEach((item, j) => {
    //   if (j === i) {
    //   } else {
    //     item.style.transform += 'scale(0.5)'
    //   }
    // })
    // scale.set(2)
  }

  return (
    <div className={styles['infiniteGrid']} ref={infiniteGridRef}>
      <motion.div
        className={bem('grid')}
        style={{
          x,
          y,
          scale,
        }}
      >
        {Array.from(Array(num_cols * num_rows)).map((a, i) => {
          return (
            <Square
              onClick={clickEvent}
              debug={IS_DEBUG}
              col={i % num_cols}
              row={Math.floor(i / num_rows)}
              w={w}
              h={h}
              key={`sq-${i}`}
              i={i}
            />
          )
        })}
      </motion.div>
    </div>
  )
}
