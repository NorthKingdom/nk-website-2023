import { gql } from '@apollo/client'
import { RESPONSIVE_IMAGE } from '@graphql/fragments/ResponsiveImage.fragment'
import { VIDEO } from '../fragments/Video.fragment'

export const FEATURED_CASES = gql`
  ${VIDEO}
  ${RESPONSIVE_IMAGE}

  fragment featuredCases on FeaturedCasesComponent {
    sys {
      id
    }
    initial
    enableBatching
    batchSize
    cases: casesCollection(limit: 10) {
      items {
        title
        client
        vertical
        slug
        thumbnail {
          ...responsiveImage
          ...video
        }
      }
    }
  }
`
