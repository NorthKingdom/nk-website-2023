import { gql } from '@apollo/client'
import { RESPONSIVE_IMAGE } from './fragments/ResponsiveImage.fragment'
import { VIDEO } from './fragments/Video.fragment'
import { CASE_HERO } from './fragments/CaseHero.fragment'
import { DESCRIPTION } from './fragments/DescriptionComponent.fragment'
import { TWO_IMAGE_COMPONENT } from './fragments/TwoImageComponent.fragment'

export const HOME_PAGE_QUERY = (draftMode: boolean) => gql`
  ${RESPONSIVE_IMAGE}
  ${VIDEO}

  query {
    home(preview: ${draftMode}, id: "3uX3aK4XeCQySQQohsAsyN") {
      aboutNk
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
      journalSectionText
      journalSectionHeading
      infoBlock {
        footerHeroText
        changingFooterWords
        skeOfficeName
        skeOfficeAddrLine1
        skeOfficeAddrLine2
        skeOfficeImgGallery
        sthlmOfficeName
        sthlmOfficeAddrLine1
        sthlmOfficeAddrLine2
        sthlmOfficeImgGallery
        bcnOfficeName
        bcnOfficeAddrLine1
        bcnOfficeAddrLine2
        bcnOfficeImgGallery
        careersMail
        internMail
        pressMail
        infoPhoneNumber
        infoMail
        linkedinLink
        twitterLink
        instagramLink
        facebookLink
        noaText
      }
      linkText
      linkImages {
        imageCollection {
          items {
            url
          }
        }
      }
    }
  }
`

export const CASE_ARCHIVE_QUERY = gql`
  query CaseArchiveQuery($limit: Int = 20, $skip: Int = 0) {
    caseArchive: caseCollection(limit: $limit, skip: $skip, order: date_DESC) {
      total
      items {
        __typename
        sys {
          id
        }
        slug
        title
        client
        date
        projectLink
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
  query {
    about(preview: ${draftMode}, id: "51Nfb7PPc4BlNbxemmxCJS") {
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
