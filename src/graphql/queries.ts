import { gql } from '@apollo/client'
import { RESPONSIVE_IMAGE } from './fragments/ResponsiveImage.fragment'
import { VIDEO } from './fragments/Video.fragment'
import { CASE_HERO } from './fragments/CaseHero.fragment'
import { DESCRIPTION } from './fragments/DescriptionComponent.fragment'
import { TWO_IMAGE_COMPONENT } from './fragments/TwoImageComponent.fragment'

export const HOME_PAGE_QUERY = (draftMode: boolean) => gql`

  query {
    home(preview: ${draftMode}, id: "1adP5ve54HEOfoZthZju8A") {
      homePageTitle
    }
  }
`

export const CASE_ARCHIVE_QUERY = gql`
  query CaseArchiveQuery($limit: Int = 20, $skip: Int = 0, $vertical: String) {
    caseArchive: caseCollection(limit: $limit, skip: $skip, order: date_DESC, where: { vertical: $vertical }) {
      total
      items {
        __typename
        sys {
          id
          __typename
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

export const WORK_PAGE_QUERY = (draftMode: boolean) => gql`
  ${RESPONSIVE_IMAGE}
  ${VIDEO}

  query WorkPageQuery {
    home(preview: ${draftMode}, id: "3uX3aK4XeCQySQQohsAsyN") {
      heroCasesCollection {
        items {
          title
          client
          vertical
          slug
          description
          thumbnail {
            ...responsiveImage
            ...video
          }
        }
      }
    }
  }
`

export const ABOUT_PAGE_QUERY = (draftMode: boolean) => gql`
  ${RESPONSIVE_IMAGE}
  ${VIDEO}

  query {
    about(id: "4UezmZj7umAjZ51VwvkU9x") {
      hero {
        title
        image {
          desktopImage {
            url
          }
          mobileImage {
            url
          }
          altText
        }
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

  query {
    caseCollection(preview: ${draftMode}, limit: 1, where: { slug: "${caseSlug}" }) {
      items {
        title
        client
        slug
        backgroundColor
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

export const CONTACT_PAGE_QUERY = (draftMode: boolean) => gql`
  ${RESPONSIVE_IMAGE}

  query {
    contactPage(id: "6G3HwVWkI0Asw2dCdLlKng") {
      hero {
        title
        image {
          ...responsiveImage
        }
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
