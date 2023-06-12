import { gql } from '@apollo/client'

export const TEXT_BLOCK = gql`
  fragment textBlock on DescriptionComponent {
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
