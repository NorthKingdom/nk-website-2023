import { gql } from '@apollo/client'

export const VIDEO = gql`
  fragment video on Video {
    __typename
    sys {
      id
    }
    desktopVideoCollection(limit: 5) {
      items {
        url
        contentType
      }
    }
    mobileVideoCollection(limit: 5) {
      items {
        url
        contentType
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
