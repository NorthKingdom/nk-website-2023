import { gql } from '@apollo/client'
import { RESPONSIVE_IMAGE } from '@graphql/fragments/ResponsiveImage.fragment'

export const INFINITE_GRID = gql`
  ${RESPONSIVE_IMAGE}

  fragment infiniteGrid on InfiniteGrid {
    sys {
      id
    }
    itemsCollection(limit: 30) {
      items {
        ...responsiveImage
      }
    }
  }
`
