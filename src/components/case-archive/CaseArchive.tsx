import React, { useEffect, useRef } from 'react'
import styles from './CaseArchive.module.scss'
import { bemify } from '@utils/bemify'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import { List } from '@components/list'
import { useQuery } from '@apollo/client'
import { CASE_ARCHIVE_QUERY } from '@graphql/queries'
import type { CaseArchiveItem } from '@customTypes/cms'
import { useInViewEffect } from 'react-hook-inview'
import { noop } from '@utils/noop'
import { ThemeChangeTrigger } from '@components/theme-change-trigger'

const bem = bemify(styles, 'caseArchive')
const bemItem = bemify(styles, 'caseArchiveItem')

interface CaseArchiveProps {
  // cases: CaseArchiveItem[]
}

const CaseArchiveItem = (props: CaseArchiveItem) => {
  const projectYear = new Date(props.date).getFullYear()

  return (
    <div className={bemItem()}>
      <p className={bemItem('year')}>{projectYear}</p>
      <h2 className={bemItem('projectTitle')}>{props.title}</h2>
      <p>{props.client}</p>
      {!!props.projectLink && (
        <a className={bemItem('link')} href={props.projectLink} target="_blank" rel="noopener">
          Link
        </a>
      )}
    </div>
  )
}

interface FetchMoreTriggerProps {
  fetchMore: () => void
}

export const FetchMoreTrigger = ({ fetchMore = noop }: FetchMoreTriggerProps) => {
  const callback = useRef(fetchMore)
  useEffect(() => {
    callback.current = fetchMore
  }, [fetchMore])

  const ref = useInViewEffect(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        callback.current()
      }
    },
    { threshold: 1 }
  )

  return <div ref={ref} className={bem('fetchMoreTrigger')}></div>
}

export const CaseArchive = (props: CaseArchiveProps) => {
  const { data, previousData, loading, error, fetchMore } = useQuery(CASE_ARCHIVE_QUERY, {
    variables: {
      skip: 0,
      limit: 20,
    },
  })

  const caseArchiveData = data?.caseArchive ?? previousData?.caseArchive ?? { items: [], total: 0 }

  const _fetchMore = () => {
    const canFetchMore = caseArchiveData.items.length < caseArchiveData.total
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

  return (
    <ContentWrapper className={bem()}>
      <ThemeChangeTrigger theme="light" debug />
      <h1 className={bem('title')}>Archive</h1>
      <List items={caseArchiveData.items} id={(item) => item.sys.id} renderItem={CaseArchiveItem} />
      {loading ? <p>Loading...</p> : <FetchMoreTrigger fetchMore={_fetchMore} />}
    </ContentWrapper>
  )
}
