import { gql } from '@apollo/client'

export const PAGE_HERO = gql`
  fragment pageHero on PageHero {
    title
    image {
      ...responsiveImage
    }
  }
`
