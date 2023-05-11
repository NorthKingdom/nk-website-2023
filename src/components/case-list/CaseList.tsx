import React from 'react'
import styles from './CaseList.module.scss'
import { bemify } from '@utils/bemify'
import type { Case } from '@customTypes/cms'
import { CaseListItem } from '@components/case-list-item'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'

const bem = bemify(styles, 'caseList')

interface CaseListProps {
  cases: Case[]
  maxItems?: number
}

export const CaseList = ({ cases = [], maxItems = 6 }: CaseListProps) => {
  return (
    <ContentWrapper className={bem()}>
      {cases
        .filter((_, i) => i < maxItems)
        .map((c, i) => (
          <CaseListItem key={c.slug} {...c} index={i} />
        ))}
    </ContentWrapper>
  )
}
