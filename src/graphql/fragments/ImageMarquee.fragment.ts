import { gql } from '@apollo/client'
import { RESPONSIVE_IMAGE } from '@graphql/fragments/ResponsiveImage.fragment'

export const IMAGE_MARQUEE = gql`
  ${RESPONSIVE_IMAGE}

  fragment imageMarquee on ImageMarquee {
    sys {
      id
    }
    images: imagesCollection(limit: 50) {
      items {
        clientName
        clientLogo {
          ...responsiveImage
        }
        relatedImage {
          ...responsiveImage
        }
      }
    }
  }
`
