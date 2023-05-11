import { gql } from '@apollo/client'
import { RESPONSIVE_IMAGE } from './fragments/ResponsiveImage.fragment'
import { VIDEO } from './fragments/Video.fragment'
import { CASE_HERO } from './fragments/CaseHero.fragment'
import { DESCRIPTION } from './fragments/DescriptionComponent.fragment'
import { TWO_IMAGE_COMPONENT } from './fragments/TwoImageComponent.fragment'

export const HOME_PAGE_QUERY = gql`
  query {
    home(id: "3uX3aK4XeCQySQQohsAsyN") {
      aboutNk
    }
  }
`

export const ABOUT_PAGE_QUERY = gql`
  query {
    about(id: "51Nfb7PPc4BlNbxemmxCJS") {
      sectionOneCopy
      sectionOneHeader
      sectionOneSubheader
      sectionOneImagesCollection {
        items {
          url
        }
      }
      sectionTwoCopy
      sectionTwoHeader
      sectionTwoSubheader
      sectionTwoImagesCollection {
        items {
          url
        }
      }
      sectionThreeCopy
      sectionThreeHeader
      sectionThreeSubheader
      sectionThreeImagesCollection {
        items {
          url
        }
      }
    }
  }
`

export const CASE_PAGE_QUERY = (caseSlug: string) => gql`
  ${VIDEO}
  ${RESPONSIVE_IMAGE}
  ${CASE_HERO}
  ${DESCRIPTION}
  ${TWO_IMAGE_COMPONENT}

  query {
    caseCollection(limit: 1, where: { slug: "${caseSlug}" }) {
      items {
        title
        client
        slug
        componentsCollection(limit: 10) {
          items {
            ...heroData
            ...desc
            ...responsiveImage
            ...video
            ...twoImageData
          }
        }
      }
    }
  }
`
