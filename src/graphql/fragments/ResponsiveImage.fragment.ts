import { gql } from '@apollo/client'

export const RESPONSIVE_IMAGE = gql`
  fragment responsiveImage on ResponsiveImage {
    desktopImage {
      url
    }

    mobileImage {
      url
    }

    altText
  }
`
