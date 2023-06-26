import { gql } from '@apollo/client'
import { IMAGE_MARQUEE } from '@graphql/fragments/ImageMarquee.fragment'
import { FEATURED_VIDEO } from '@graphql/fragments/FeaturedVideo.fragment'
import { HOME_HERO } from '@graphql/fragments/HomeHero.fragment'
import { RESPONSIVE_IMAGE } from './fragments/ResponsiveImage.fragment'
import { VIDEO } from './fragments/Video.fragment'
import { CASE_HERO } from './fragments/CaseHero.fragment'
import { TEXT_BLOCK } from './fragments/TextBlock.fragment'
import { TWO_IMAGE_COMPONENT } from './fragments/TwoImageComponent.fragment'
import { FEATURED_CASES } from './fragments/FeaturedCases.fragment'
import { PAGE_HERO } from './fragments/PageHero.fragment'
import { CASE_MEDIA_GRID } from './fragments/CaseMediaGrid.fragment'
import { INFINITE_GRID } from './fragments/InfiniteGrid.fragment'
import { IRREGULAR_GRID } from './fragments/IrregularGrid.fragment'
import { STICKY_LIST } from './fragments/StickyList.fragment'
import { LINK } from './fragments/Link.fragment'
import { CLIPBOARD_COPY_ITEM } from './fragments/ClipboardCopyItem.fragment'

export const HOME_PAGE_QUERY = (draftMode: boolean) => gql`
    ${HOME_HERO}
    ${FEATURED_CASES}
    ${FEATURED_VIDEO}
    ${TEXT_BLOCK}
    ${IMAGE_MARQUEE}


  query HomePageQuery {
    home(preview: ${draftMode}, id: "1adP5ve54HEOfoZthZju8A") {
      hero (preview: ${draftMode}) {
        ...homeHero
      }
      sections: sectionsCollection (limit: 10) {
        items {
          __typename
          ...featuredCases
          ...featuredVideo
          ...imageMarquee
          ...textBlock
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
      slug
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
  ${TEXT_BLOCK}
  ${INFINITE_GRID}
  ${IRREGULAR_GRID}
  ${STICKY_LIST}

  query {
    about(preview: ${draftMode}, id: "4UezmZj7umAjZ51VwvkU9x") {
      hero {
        ...pageHero
      }
      sections: sectionsCollection(limit: 10) {
        items {
          __typename
          ...textBlock
          ...infiniteGrid
          ...irregularGrid
          ...stickyList
        }
      }
    }
  }
`

export const CASE_PAGE_QUERY = (caseSlug: string, draftMode: boolean) => gql`
  ${VIDEO}
  ${RESPONSIVE_IMAGE}
  ${CASE_HERO}
  ${TEXT_BLOCK}
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
            ...textBlock
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
  ${LINK}
  ${CLIPBOARD_COPY_ITEM}

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
              ...link
              ...clipboardCopyItem
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
            ...link
          }
        }
      }
    }
  }
`

export const CAREERS_PAGE_QUERY = (draftMode: boolean) => gql`
  ${PAGE_HERO}
  ${TEXT_BLOCK}
  ${IRREGULAR_GRID}
  ${STICKY_LIST}
  ${RESPONSIVE_IMAGE}

  query {
    careersPage(preview: ${draftMode}, id: "1biZZL9Xnhz09yjM8cF1uF") {
      title
      hero {
        ...pageHero
      }
      sections: sectionsCollection(limit: 10) {
        items {
          __typename
          ...responsiveImage
          ...textBlock
          ...irregularGrid
          ...stickyList
        }
      }
    }
  }
`

export const FOOTER_QUERY = (draftMode: boolean) => gql`
  query FooterQuery {
    footer(id: "6sB0eIDYQXM5x0g8VE0JwE") {
      statement
    }
  }
`
