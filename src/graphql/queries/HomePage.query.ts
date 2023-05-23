import { gql } from '@apollo/client'
import { HOME_HERO } from '@graphql/fragments/HomeHero.fragment'
import { FEATURED_CASES } from '@graphql/fragments/FeaturedCases.fragment'
import { FEATURED_VIDEO } from '@graphql/fragments/FeaturedVideo.fragment'
import { DESCRIPTION } from '@graphql/fragments/DescriptionComponent.fragment'
import { IMAGE_MARQUEE } from '@graphql/fragments/ImageMarquee.fragment'

export const HOME_PAGE_QUERY = (preview: boolean) => gql`
    ${HOME_HERO}
    ${FEATURED_CASES}
    ${FEATURED_VIDEO}
    ${DESCRIPTION}
    ${IMAGE_MARQUEE}


  query HomePageQuery {
    home(preview: ${preview}, id: "1adP5ve54HEOfoZthZju8A") {
      sections: sectionsCollection (limit: 10) {
        items {
          __typename
          ...homeHero
          ...featuredCases
          ...featuredVideo
          ...imageMarquee
          ...desc
        }
      }
    }
  }
`
