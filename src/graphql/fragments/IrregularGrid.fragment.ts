import { gql } from '@apollo/client'
import { RESPONSIVE_IMAGE } from '@graphql/fragments/ResponsiveImage.fragment'
import { VIDEO } from '../fragments/Video.fragment'

export const IRREGULAR_GRID = gql`
  ${VIDEO}
  ${RESPONSIVE_IMAGE}

  fragment irregularGrid on IrregularGrid {
    sys {
      id
    }
    itemsCollection(limit: 4) {
      items {
        media {
          __typename
          ...responsiveImage
          ...video
        }
        caption
      }
    }
  }
`
