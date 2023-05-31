import { gql } from '@apollo/client'
import { RESPONSIVE_IMAGE } from './fragments/ResponsiveImage.fragment'
import { VIDEO } from './fragments/Video.fragment'
import { CASE_HERO } from './fragments/CaseHero.fragment'
import { DESCRIPTION } from './fragments/DescriptionComponent.fragment'
import { TWO_IMAGE_COMPONENT } from './fragments/TwoImageComponent.fragment'
import { FEATURED_CASES } from './fragments/FeaturedCases.fragment'
import { HOME_HERO } from '@graphql/fragments/HomeHero.fragment'
import { FEATURED_VIDEO } from '@graphql/fragments/FeaturedVideo.fragment'
import { IMAGE_MARQUEE } from '@graphql/fragments/ImageMarquee.fragment'
import { PAGE_HERO } from './fragments/PageHero.fragment'
import { CASE_MEDIA_GRID } from './fragments/CaseMediaGrid.fragment'

export const HOME_PAGE_QUERY = (draftMode: boolean) => gql`
    ${HOME_HERO}
    ${FEATURED_CASES}
    ${FEATURED_VIDEO}
    ${DESCRIPTION}
    ${IMAGE_MARQUEE}


  query HomePageQuery {
    home(preview: ${draftMode}, id: "1adP5ve54HEOfoZthZju8A") {
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

export const WORK_PAGE_QUERY = (draftMode: boolean) => gql`
  ${FEATURED_CASES}

  query WorkPageQuery {
    workPage(preview: ${draftMode}, id: "57RwiXldBpUyL6FoOP2t0f") {
        featuredCases {
            ...featuredCases
        }
    }
  }
`

export const NEXT_CASES_QUERY = (draftMode: boolean) => gql`
${VIDEO}
${RESPONSIVE_IMAGE}
${CASE_HERO}

fragment newF on FeaturedCasesComponent {
  sys {
    id
  }
  cases: casesCollection(limit: 10) {
    items {
      title
      client
      componentsCollection(limit: 10) {
        items {
          ...heroData
        }
      }
    }
  }
}

  query WorkPageQuery {
    workPage(preview: ${draftMode}, id: "57RwiXldBpUyL6FoOP2t0f") {
        featuredCases {
            ...newF
        }
    }
  }
`

export const CASE_ARCHIVE_QUERY = gql`
  query CaseArchiveQuery($limit: Int = 20, $skip: Int = 0, $vertical: String) {
    caseArchive: caseCollection(limit: $limit, skip: $skip, order: date_DESC, where: { vertical: $vertical }) {
      total
      items {
        sys {
          id
        }
        slug
        title
        client
        date
        projectLink
        vertical
      }
    }
  }
`

export const ABOUT_PAGE_QUERY = (draftMode: boolean) => gql`
  ${RESPONSIVE_IMAGE}
  ${VIDEO}
  ${PAGE_HERO}

  query {
    about(preview: ${draftMode}, id: "4UezmZj7umAjZ51VwvkU9x") {
      hero {
        ...pageHero
      }
      list {
        itemsCollection(limit: 5) {
          items {
            header
            description
            mediaCollection {
              items {
                ...responsiveImage
                ...video
              }
            }
            link {
              copy
              url
            }
          }
        }
      }
      gridImagesCollection {
        items {
          ...responsiveImage
        }
      }
    }
  }
`

export const CASE_PAGE_QUERY = (caseSlug: string, draftMode: boolean) => gql`
  ${VIDEO}
  ${RESPONSIVE_IMAGE}
  ${CASE_HERO}
  ${DESCRIPTION}
  ${TWO_IMAGE_COMPONENT}
  ${CASE_MEDIA_GRID}

  query {
    caseCollection(preview: ${draftMode}, limit: 1, where: { slug: "${caseSlug}" }) {
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
            ...mediaGrid
          }
        }
      }
    }
  }
`

export const CONTACT_PAGE_QUERY = (draftMode: boolean) => gql`
  ${RESPONSIVE_IMAGE}
  ${PAGE_HERO}

  query {
    contactPage(preview: ${draftMode}, id: "6G3HwVWkI0Asw2dCdLlKng") {
      hero {
        ...pageHero
      }
      contactSectionCollection {
        items {
          title
          linksCollection {
            items {
              copy
              url
            }
          }
        }
      }
      officeSectionCollection {
        items {
          officeName
          addressLineOne
          addressLineTwo
          country
          directions {
            copy
            url
          }
        }
      }
    }
  }
`

export const CAREERS_PAGE_QUERY = (draftMode: boolean) => gql`
  ${RESPONSIVE_IMAGE}
  ${DESCRIPTION}
  ${PAGE_HERO}

  query {
    careersPage(preview: ${draftMode}, id: "1biZZL9Xnhz09yjM8cF1uF") {
      title
      hero {
        ...pageHero
      }
      introduction {
        ...desc
      }
    }
  }
`
