import { gql } from '@apollo/client'

export const CASE_MEDIA_GRID = gql`
  fragment mediaGrid on CaseMediaGrid {
    slotOne {
      media {
        ...responsiveImage
        ...video
      }
      offset
    }
    slotTwo {
      media {
        ...responsiveImage
        ...video
      }
      offset
    }
    slotThree {
      media {
        ...responsiveImage
        ...video
      }
      offset
    }
    slotFour {
      media {
        ...responsiveImage
        ...video
      }
      offset
    }
  }
`
