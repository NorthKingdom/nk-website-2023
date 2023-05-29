import React, { useReducer, useRef, useState } from 'react'
import styles from './CaseArchive.module.scss'
import { bemify } from '@utils/bemify'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import { List } from '@components/list'
import { useQuery } from '@apollo/client'
import { CASE_ARCHIVE_QUERY } from '@graphql/queries'
import type { CaseArchiveItem } from '@customTypes/cms'
import Image from 'next/image'
import { noop } from '@utils/noop'
import { ThemeChangeTrigger } from '@components/theme-change-trigger'
import * as Filters from '@components/filters'
import { useIsTouchDevice } from '@hooks/use-is-touch-device'
import { AspectRatio } from '@components/aspect-ratio/AspectRatio'
import { useResize } from '@hooks/use-resize'
import { useCustomCursor } from '@hooks/use-custom-cursor'
import { useBreakpointUntil } from '@hooks/use-breakpoint'
import { useOnScroll } from '@hooks/use-on-scroll'
import * as Select from '@components/select'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'

const bem = bemify(styles, 'caseArchive')
const bemItem = bemify(styles, 'caseArchiveItem')

// @TODO: decide
const FILTERS = ['all', 'gaming', 'entertainment']

const FILTERS_ANIMATION = {
  initial: { opacity: 0, x: '10%' },
  animate: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.15, ease: 'easeOut' } },
  exit: { opacity: 0, x: '40%', transition: { duration: 0.15, ease: 'easeIn' } },
  transition: { duration: 0.25, ease: 'easeInOut' },
}

const DROPDOWN_ANIMATION = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { delay: 0.2, staggerChildren: 0.3 } },
  exit: { opacity: 0, x: -20 },
}

const DROPDOWN_ITEM_ANIMATION = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

/**
 * Custom cursor image context.
 */
const CustomCursorImageContext = React.createContext<{
  setSrc: (src: string) => void
}>({ setSrc: noop })

/**
 * Case archive item component.
 */

interface CaseArchiveItemProps extends CaseArchiveItem {
  index: number
  mobile: boolean
}

const IMAGE_POOL = ['dummy/case-thumb-fallback.webp', 'dummy/temp-left-riot-img.jpg', 'dummy/temp-right-riot-img.jpg']

const CaseArchiveItem = (props: CaseArchiveItemProps) => {
  const projectYear = new Date(props.date).getFullYear()
  const { setSrc } = React.useContext(CustomCursorImageContext)
  const src = IMAGE_POOL[props.index % IMAGE_POOL.length]

  return (
    <div className={bemItem()} onMouseOver={() => setSrc(src)}>
      <p className={bemItem('year')}>{projectYear}</p>

      {props.mobile ? (
        <div className={bemItem('projectInfo')}>
          <h2 className={bemItem('projectTitle')}>{props.title}</h2>
          <p className={bemItem('vertical')}>{props.vertical}</p>
        </div>
      ) : (
        <>
          <h2 className={bemItem('projectTitle')}>{props.title}</h2>
          <p className={bemItem('vertical')}>{props.vertical}</p>
        </>
      )}

      {!!props.projectLink && (
        <a className={bemItem('link')} href={props.projectLink} target="_blank" rel="noopener">
          ↗
        </a>
      )}
    </div>
  )
}

/**
 * Case archive component.
 */
export const CaseArchive = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const isTouchDevice = useIsTouchDevice()
  const isMobileBreakpoint = useBreakpointUntil('tablet')
  const [filter, setFilter] = React.useState(FILTERS[0])
  const { data, previousData, loading, error, fetchMore } = useQuery(CASE_ARCHIVE_QUERY, {
    variables: {
      skip: 0,
      limit: 20,
      vertical: filter === 'all' ? undefined : filter,
    },
  })

  const caseArchiveData = data?.caseArchive ?? previousData?.caseArchive ?? { items: [], total: 0 }
  const canFetchMore = caseArchiveData.items.length < caseArchiveData.total

  const _fetchMore = () => {
    if (!canFetchMore || loading) return
    fetchMore({
      variables: {
        skip: caseArchiveData.items.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          caseArchive: {
            ...prev.caseArchive,
            items: [...prev.caseArchive.items, ...fetchMoreResult.caseArchive.items],
          },
        })
      },
    })
  }

  const [src, setSrc] = useState('dummy/case-thumb-fallback.webp')
  const [sectionHovered, setSectionHovered] = useState(false)

  const { cursor, effect: cursorEffect } = useCustomCursor(cursorRef, {
    enabled: !isTouchDevice,
  })

  useResize(
    (e) => {
      cursor.setLimit(cursorEffect?.id, {
        x: window.innerWidth * 0.5,
      })
    },
    { wait: 100 }
  )

  const caseArchiveHeaderRef = useRef<HTMLDivElement>(null)
  const filtersContainerRef = useRef<HTMLDivElement>(null)
  const [filtersDisplayMode, toggleFiltersDisplayMode] = useReducer((s) => (s === 'list' ? 'dropdown' : 'list'), 'list')

  const FILTERS_STICKY_THRESHOLD = 0.93

  useOnScroll(
    ({ progress }) => {
      if (progress >= FILTERS_STICKY_THRESHOLD && filtersDisplayMode === 'list') {
        toggleFiltersDisplayMode()
      } else if (progress < FILTERS_STICKY_THRESHOLD && filtersDisplayMode === 'dropdown') {
        toggleFiltersDisplayMode()
      }
    },
    { target: caseArchiveHeaderRef }
  )

  const FILTERS_DROPDOWN_ITEMS = [...FILTERS].filter((f) => f !== filter).sort((a, b) => a.length - b.length)

  return (
    <ContentWrapper className={bem()}>
      <ThemeChangeTrigger theme="light" />

      {/** Custom cursor */}
      <AspectRatio ratio={4 / 3} className={bem('cursor')} ref={cursorRef} data-active={sectionHovered}>
        <Image src={src} alt="" width={200} height={150} aria-hidden="true" />
      </AspectRatio>

      {/* <div className={bem('header')}> */}
      <h2 className={bem('title')} ref={caseArchiveHeaderRef}>
        Archive
      </h2>
      <div ref={filtersContainerRef} className={bem('filtersContainer')}>
        <AnimatePresence mode="popLayout">
          {filtersDisplayMode === 'list' && (
            <motion.div key="list" variants={FILTERS_ANIMATION} className={bem('filtersListContainer')}>
              <Filters.Root defaultValue={filter} onValueChange={setFilter} className={bem('filtersList')}>
                {FILTERS.map((f, i, list) => (
                  <Filters.Item key={f} value={f} className={bem('filtersListItem')}>
                    {f}
                    {i < list.length - 1 && ','}
                  </Filters.Item>
                ))}
              </Filters.Root>
            </motion.div>
          )}
          {filtersDisplayMode === 'dropdown' && (
            <motion.div key="dropdown" variants={DROPDOWN_ANIMATION} className={bem('filtersDropdownContainer')}>
              <Select.Root defaultValue={filter} onValueChange={setFilter} className={bem('filtersDropdown')}>
                {FILTERS_DROPDOWN_ITEMS.map((f) => (
                  <Select.Item
                    key={f}
                    value={f}
                    className={bem('filtersDropdownItem')}
                    as={motion.div}
                    variants={DROPDOWN_ITEM_ANIMATION}
                  >
                    {f}
                  </Select.Item>
                ))}
              </Select.Root>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CustomCursorImageContext.Provider value={{ setSrc }}>
        <List
          items={caseArchiveData.items.map((item: any, i: number) => ({ ...item, index: i }))}
          id={(item) => item.sys.id}
          renderItem={(props) => <CaseArchiveItem mobile={isMobileBreakpoint} {...props} />}
          onMouseEnter={() => {
            if (isTouchDevice) return
            setSectionHovered(true)
          }}
          onMouseLeave={() => {
            if (isTouchDevice) return
            setSectionHovered(false)
          }}
        />
      </CustomCursorImageContext.Provider>

      {canFetchMore && (
        <button className={bem('fetchMoreButton')} disabled={loading} onClick={_fetchMore}>
          Fetch More
        </button>
      )}
    </ContentWrapper>
  )
}
