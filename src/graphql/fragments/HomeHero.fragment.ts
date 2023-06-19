import { gql } from '@apollo/client'
import { VIDEO } from '../fragments/Video.fragment'

export const HOME_HERO = gql`
  ${VIDEO}

  fragment homeHero on HomeHeroComponent {
    sys {
      id
    }
    statement
    shieldVideo {
      ...video
    }
    shieldLightLeakColorVtt {
      url
      contentType
    }
    showreelVideo {
      ...video
    }
  }
`
