import { gql } from '@apollo/client'

export const CASE_HERO = gql`
  fragment heroData on CaseHero {
    heroMedia {
      ...video
      ...responsiveImage
    }
  }
`
