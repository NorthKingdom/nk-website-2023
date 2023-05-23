import { gql } from '@apollo/client'

export const VIDEO = gql`
  fragment video on Video {
    __typename
    sys {
      id
    }
    videoName
    desktopVideoCollection(limit: 5) {
      items {
        url
      }
    }
    mobileVideoCollection(limit: 5) {
      items {
        url
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
