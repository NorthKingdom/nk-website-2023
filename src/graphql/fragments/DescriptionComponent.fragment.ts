import { gql } from '@apollo/client'

export const DESCRIPTION = gql`
  fragment desc on DescriptionComponent {
    sys {
      id
    }
    copyLeft
    copyRight
    link {
      copy
      url
    }
  }
`
