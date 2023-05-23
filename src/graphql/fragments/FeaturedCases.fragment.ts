import { gql } from '@apollo/client'
import { VIDEO } from '../fragments/Video.fragment'
import { RESPONSIVE_IMAGE } from '@graphql/fragments/ResponsiveImage.fragment'

export const FEATURED_CASES = gql`
  ${VIDEO}
  ${RESPONSIVE_IMAGE}

  fragment featuredCases on FeaturedCasesComponent {
    sys {
      id
    }
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
