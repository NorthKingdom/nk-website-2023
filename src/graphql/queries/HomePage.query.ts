import { gql } from '@apollo/client'
import { VIDEO } from '../fragments/Video.fragment'

export const HOME_HERO = gql`
  ${VIDEO}
  fragment homeHero on HomeHeroComponent {
    statement
  }
`

export const HOME_PAGE_QUERY = (preview: boolean) => gql`
    ${HOME_HERO}

  query HomePageQuery {
    home(preview: ${preview}, id: "1adP5ve54HEOfoZthZju8A") {
      sectionsCollection {
        items {
          __typename
          ...homeHero
        }
      }
    }
  }
`
