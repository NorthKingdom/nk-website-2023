export const HOME_PAGE_QUERY = `


fragment video on Video {
    srcCollection {
      items {
        url
      }
    }
  }

fragment responsiveImage on ResponsiveImage {
    desktopImage {
      url
    }
    mobileImage {
      url
    }
    altText
  }

{
    home(id: "3uX3aK4XeCQySQQohsAsyN") {
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

export const ABOUT_PAGE_QUERY = `
{
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

export const CASE_PAGE_QUERY = (caseSlug: string) => `
{
    caseCollection(where: { slug: "${caseSlug}" }) {
      items {
        title
        date
        vertical
        client
        capability
        tagsCollection {
          items {
            name
          }
        }
        slug
        thumbnail {
          url
        }
        thumbnailMobile {
          url
        }
        projectLink
        readMoreLink
        public
      }
    }
}
`
