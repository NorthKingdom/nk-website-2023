import React, { useReducer } from 'react'
import { bemify } from '@utils/bemify'
import { CaseListItem } from '@components/case-list-item'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import { LoadMore } from '@components/load-more'
import styles from './CaseList.module.scss'
import type { CasePayload } from '@customTypes/cms'

const bem = bemify(styles, 'caseList')

interface CaseListProps {
  cases: CasePayload[]
  initial: number
  enableBatching: boolean
  batchSize: number
}

interface ListState {
  itemsLength: number
  itemsTotal: number
  canShowMore: boolean
  batchSize: number
}

export const CaseList = ({ cases = [], initial = 6, enableBatching = true, batchSize = 4 }: CaseListProps) => {
  const [{ itemsLength, canShowMore }, showNewBatch] = useReducer(
    (state: ListState): ListState => {
      const itemsLength = Math.min(state.itemsLength + state.batchSize, state.itemsTotal)

      return {
        ...state,
        itemsLength: Math.min(state.itemsLength + state.batchSize, state.itemsTotal),
        canShowMore: itemsLength < state.itemsTotal,
      }
    },
    {
      itemsLength: initial,
      itemsTotal: cases.length,
      canShowMore: cases.length > initial,
      batchSize,
    } as ListState
  )

  return (
    <ContentWrapper className={bem()} theme="dark" notch>
      <div className={bem('cases')} data-can-show-more-cases={canShowMore}>
        {cases
          .filter((_, i) => i < itemsLength)
          .map((c, i) => (
            <CaseListItem key={c.slug} {...c} index={i} />
          ))}
      </div>
      {enableBatching && canShowMore && <LoadMore className={bem('loadMore')} onClick={showNewBatch} theme="dark" />}
    </ContentWrapper>
  )
}
