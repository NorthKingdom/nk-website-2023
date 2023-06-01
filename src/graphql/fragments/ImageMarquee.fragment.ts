import { gql } from '@apollo/client'

export const IMAGE_MARQUEE = gql`
  fragment imageMarquee on ImageMarquee {
    sys {
      id
    }
    images: imagesCollection(limit: 50) {
      items {
        clientName
        clientLogo {
          __typename
          url
        }
        relatedImage {
          __typename
          url
        }
      }
    }
  }
`
