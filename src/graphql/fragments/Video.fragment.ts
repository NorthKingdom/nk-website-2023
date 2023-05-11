import { gql } from '@apollo/client'

export const VIDEO = gql`
  fragment video on Video {
    muted
    autoPlay
    loop
    posterImage {
      url
    }
    srcCollection(limit: 5) {
      items {
        url
      }
    }
  }
`
