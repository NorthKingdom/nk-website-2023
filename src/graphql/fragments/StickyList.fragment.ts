import { gql } from '@apollo/client'
import { VIDEO } from '../fragments/Video.fragment'
import { RESPONSIVE_IMAGE } from '@graphql/fragments/ResponsiveImage.fragment'

export const STICKY_LIST = gql`
  ${VIDEO}
  ${RESPONSIVE_IMAGE}

  fragment stickyList on StickyList {
    sys {
      id
    }
    itemsCollection(limit: 5) {
      items {
        header
        description
        mediaCollection(limit: 5) {
          items {
            ...responsiveImage
            ...video
          }
        }
        link {
          copy
          url
        }
      }
    }
  }
`
