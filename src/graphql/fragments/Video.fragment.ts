import { gql } from '@apollo/client'

export const VIDEO = gql`
  fragment video on Video {
    __typename
    sys {
      id
    }
    desktopVideoCollection(limit: 3) {
      items {
        url
        contentType
        width
        height
      }
    }
    mobileVideoCollection(limit: 3) {
      items {
        url
        contentType
        width
        height
      }
    }
    posterImage {
      url
    }
    autoPlay
    loop
    muted
  }
`
