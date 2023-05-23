import { gql } from '@apollo/client'
import { VIDEO } from '../fragments/Video.fragment'

export const FEATURED_VIDEO = gql`
  ${VIDEO}

  fragment featuredVideo on FeaturedVideo {
    sys {
      id
    }
    title
    description
    video {
      ...video
    }
  }
`
