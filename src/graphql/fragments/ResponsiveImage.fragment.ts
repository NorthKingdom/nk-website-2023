import { gql } from '@apollo/client'

export const RESPONSIVE_IMAGE = gql`
  fragment responsiveImage on ResponsiveImage {
    sys {
      id
    }
    desktopImage {
      url
      width
      height
    }
    mobileImage {
      url
      width
      height
    }
    altText
  }
`
