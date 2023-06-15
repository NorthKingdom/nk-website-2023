import { gql } from '@apollo/client'

export const LINK = gql`
  fragment link on Link {
    copy
    url
  }
`
