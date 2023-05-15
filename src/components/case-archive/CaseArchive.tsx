import React, { useCallback, useEffect, useRef } from 'react'
import styles from './CaseArchive.module.scss'
import { bemify } from '@utils/bemify'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import { List } from '@components/list'
import { useQuery } from '@apollo/client'
import { CASE_ARCHIVE_QUERY } from '@graphql/queries'
import type { CaseArchiveItem } from '@customTypes/cms'
import { useInViewEffect } from 'react-hook-inview'
import { noop } from '@utils/noop'

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
        <a className={bemItem('link')} href={props.projectLink}>
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
  const { data, loading, error, fetchMore } = useQuery(CASE_ARCHIVE_QUERY, {
    variables: { limit: 20, skip: 0 },
  })

  const _fetchMore = () => {
    const canFetchMore = data?.caseArchive?.items?.length < (data?.caseArchive?.total ?? 50)

    if (!canFetchMore || loading) return

    fetchMore({
      variables: {
        skip: data?.caseArchive?.items?.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        console.log({
          prev,
          fetchMoreResult,
        })
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
      <h1 className={bem('title')}>Archive</h1>
      <List items={data?.caseArchive?.items ?? []} id={(item) => item.sys.id} renderItem={CaseArchiveItem} />
      {loading ? <p>Loading...</p> : <FetchMoreTrigger fetchMore={_fetchMore} />}
    </ContentWrapper>
  )
}
