import React, { useReducer } from 'react'
import { bemify } from '@utils/bemify'
import { CaseListItem } from '@components/case-list-item'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import { LoadMore } from '@components/load-more'
import { useInViewAnimation } from '@hooks/use-inview-animation'
import styles from './CaseList.module.scss'
import type { FeaturedCasesPayload } from '@customTypes/cms'

const bem = bemify(styles, 'caseList')

interface CaseListProps extends Omit<FeaturedCasesPayload, '__typename' | 'sys'> {
  revealEffect?: boolean
}
interface ListState {
  itemsLength: number
  itemsTotal: number
  canShowMore: boolean
  batchSize: number
}

export const CaseList = ({
  cases = { items: [] },
  initial = 6,
  enableBatching = true,
  batchSize = 4,
  revealEffect = true,
}: CaseListProps) => {
  const revealEffectRef = useInViewAnimation('animate-featured-case-fade-up', {
    stagger: true,
    staggerDelay: 0.08,
    initialDelay: 0.1,
    threshold: 0,
  })
  const ref = revealEffect ? revealEffectRef : null

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
      itemsTotal: cases.items.length,
      canShowMore: cases.items.length > initial,
      batchSize,
    } as ListState
  )

  return (
    <ContentWrapper className={bem()} theme="dark" notch>
      <div ref={ref} className={bem('cases')} data-can-show-more-cases={canShowMore}>
        {cases.items
          .filter((_, i) => i < itemsLength)
          .map((c, i) => (
            <CaseListItem key={c.slug} {...c} index={i} />
          ))}
      </div>
      {enableBatching && canShowMore && <LoadMore className={bem('loadMore')} onClick={showNewBatch} theme="dark" />}
    </ContentWrapper>
  )
}
