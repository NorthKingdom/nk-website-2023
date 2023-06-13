import { gql } from '@apollo/client'
import { VIDEO } from '../fragments/Video.fragment'
import { RESPONSIVE_IMAGE } from '@graphql/fragments/ResponsiveImage.fragment'

export const IRREGULAR_GRID = gql`
  ${VIDEO}
  ${RESPONSIVE_IMAGE}

  fragment irregularGrid on IrregularGrid {
    sys {
      id
    }
    itemsCollection(limit: 4) {
      items {
        ...responsiveImage
        ...video
      }
    }
  }
`
