import { gql } from '@apollo/client'

export const DESCRIPTION = gql`
  fragment desc on DescriptionComponent {
    sys {
      id
    }
    copy
    header
    link {
      copy
      url
    }
  }
`
