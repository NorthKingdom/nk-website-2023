import { gql } from '@apollo/client'

export const DESCRIPTION = gql`
  fragment desc on DescriptionComponent {
    copy
    header
    link {
      copy
      url
    }
  }
`
