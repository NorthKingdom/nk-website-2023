import React from 'react'
import styles from './CaseArchive.module.scss'
import { bemify } from '@utils/bemify'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import { List } from '@components/list'
import type { CaseArchiveItem } from '@customTypes/cms'

const bem = bemify(styles, 'caseArchive')
const bemItem = bemify(styles, 'caseArchiveItem')

interface CaseArchiveProps {
  cases: CaseArchiveItem[]
}

const CaseArchiveItem = (props: CaseArchiveItem) => {
  const projectYear = new Date(props.date).getFullYear()

  return (
    <div className={bemItem()}>
      <p className={bemItem('year')}>{projectYear}</p>
      <h2 className={bemItem('projectTitle')}>{props.title}</h2>
      <p className={bemItem('client')}>{props.client}</p>
      {!!props.projectLink && (
        <a className={bemItem('link')} href={props.projectLink}>
          Link
        </a>
      )}
    </div>
  )
}

export const CaseArchive = (props: CaseArchiveProps) => {
  return (
    <ContentWrapper className={bem()}>
      <h1 className={bem('title')}>Archive</h1>
      <List items={props.cases} renderItem={CaseArchiveItem} />
    </ContentWrapper>
  )
}
