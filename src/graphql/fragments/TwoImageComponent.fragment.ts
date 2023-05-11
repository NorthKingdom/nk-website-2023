import { gql } from '@apollo/client'

export const TWO_IMAGE_COMPONENT = gql`
  fragment twoImageData on TwoImageComponent {
    imageOne {
      altText
      mobileImage {
        url
      }
      desktopImage {
        url
      }
    }
    imageOneCaption
    imageTwoCaption
    imageTwo {
      altText
      mobileImage {
        url
      }
      desktopImage {
        url
      }
    }
  }
`
