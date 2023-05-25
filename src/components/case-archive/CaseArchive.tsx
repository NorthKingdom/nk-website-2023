import React, { useRef, useState } from 'react'
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

const bem = bemify(styles, 'caseArchive')
const bemItem = bemify(styles, 'caseArchiveItem')

const FILTERS = ['all', 'gaming', 'entertainment']

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
}

const IMAGE_POOL = ['dummy/case-thumb-fallback.webp', 'dummy/temp-left-riot-img.jpg', 'dummy/temp-right-riot-img.jpg']

const CaseArchiveItem = (props: CaseArchiveItemProps) => {
  const projectYear = new Date(props.date).getFullYear()
  const { setSrc } = React.useContext(CustomCursorImageContext)
  const src = IMAGE_POOL[props.index % IMAGE_POOL.length]

  return (
    <div className={bemItem()} onMouseOver={() => setSrc(src)}>
      <p className={bemItem('year')}>{projectYear}</p>
      <h2 className={bemItem('projectTitle')}>{props.title}</h2>
      <p className={bemItem('vertical')}>{props.vertical}</p>
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

  return (
    <ContentWrapper className={bem()}>
      <ThemeChangeTrigger theme="light" />

      {/** Custom cursor */}
      <AspectRatio ratio={4 / 3} className={bem('cursor')} ref={cursorRef} data-active={sectionHovered}>
        <Image src={src} alt="" width={200} height={150} aria-hidden="true" />
      </AspectRatio>

      <div className={bem('header')}>
        <h2 className={bem('title')}>Archive</h2>
        <Filters.Root defaultValue={filter} onValueChange={setFilter} className={bem('filterRoot')}>
          {FILTERS.map((f) => (
            <Filters.Item key={f} value={f} className={bem('filterItem')}>
              {f}
            </Filters.Item>
          ))}
        </Filters.Root>
      </div>

      <CustomCursorImageContext.Provider value={{ setSrc }}>
        <List
          items={caseArchiveData.items.map((item: any, i: number) => ({ ...item, index: i }))}
          id={(item) => item.sys.id}
          renderItem={CaseArchiveItem}
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
