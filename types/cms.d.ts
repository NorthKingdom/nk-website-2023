import { idText } from 'typescript'

export interface Asset {
  __typename: 'Asset'
  url: string
}

export interface PageHero {
  title: string
  image: ResponsiveImage
}

export interface TextBlock {
  __typename: 'DescriptionComponent'
  sys: { id: string }
  heading?: string
  copyLeft?: string
  copyRight?: string
  link?: Link
}

export interface MediaGridItem {
  media: ResponsiveImage | Video
  offset: '0%' | '25%' | '50%'
}

export interface About {
  hero: PageHero
  sections: {
    items: (TextBlock | InfiniteGrid | IrregularGrid | StickyList)[]
  }
}

export interface Link {
  __typename: 'Link'
  copy: string
  url: string
}

export interface ClipboardCopyItem {
  __typename: 'ClipboardCopyItem'
  label: string
  content: string
  hoverLabel?: string
  confirmationLabel?: string
}

export interface Video {
  muted: boolean
  autoPlay: boolean
  loop: boolean
  posterImage: {
    url: string
  }
  desktopVideoCollection: {
    items: {
      url: string
      contentType: string
      width: number
      height: number
    }[]
  }
  mobileVideoCollection: {
    items: {
      url: string
      contentType: string
      width: number
      height: number
    }[]
  }
  __typename: 'Video'
}

export interface ResponsiveImage {
  desktopImage: {
    url: string
    width: number
    height: number
  }
  mobileImage: {
    url: string
    width: number
    height: number
  }
  altText: string
  __typename: 'ResponsiveImage'
}

export type Media = ResponsiveImage | Video

export interface StickyList {
  __typename: 'StickyList'
  sys: { id: string }
  itemsCollection: {
    items: {
      header: string
      description: string
      mediaCollection: {
        items: (ResponsiveImage | Video)[]
      }
      link: {
        copy: string
        url: string
      }
    }[]
  }
}

export interface Award {
  awardName: string
  count: number
}

export interface AwardList {
  awards: Award[]
}

export interface CaseHero {
  heroMedia: ResponsiveImage | Video
  __typename: 'CaseHero'
}

export interface TwoImageComponent {
  imageOne: ResponsiveImage
  imageOneCaption?: string
  imageTwo: ResponsiveImage
  imageTwoCaption?: string
  __typename: 'TwoImageComponent'
}

export interface CaseMediaGrid {
  slotOne?: MediaGridItem
  slotTwo?: MediaGridItem
  slotThree?: MediaGridItem
  slotFour?: MediaGridItem
  __typename: 'CaseMediaGrid'
}

export interface Case {
  title: string
  slides: Slides[]
  date: any
  vertical: string
  client: string
  capability: string
  tags: Tags[]
  slug: string
  thumbnail: Video | ResponsiveImage
  thumbnailMobile: Video | ResponsiveImage
  projectLink: string
  readMoreLink: string
  public: boolean
  image?: string
  componentsCollection: {
    items: (CaseHero | DescriptionComponent | ResponsiveImage | Video | TwoImageComponent | CaseMediaGrid)[]
  }
  backgroundColor?: {
    value: string
  }
}

export interface CaseArchiveItem extends Pick<Case, 'title' | 'date' | 'client' | 'projectLink' | 'vertical'> {
  sys: { id: string }
}

export interface CaseArchive {
  total: number
  items: CaseArchiveItem[]
}

export interface Collection {
  cases: Case[]
  name: string
  description: string
  public: boolean
  slug: string
}

export interface CollectionsPage {
  collections: Collection[]
  name: string
}

export interface HomeHero {
  __typename: 'HomeHeroComponent'
  sys: { id: string }
  statement: string
  shieldVideo: Video
  showreelVideo: Video
}

export interface FeaturedCases {
  __typename: 'FeaturedCasesComponent'
  sys: { id: string }
  initial: number
  enableBatching: boolean
  batchSize: number
  cases: { items: Case[] }
}

export interface FeaturedVideo {
  __typename: 'FeaturedVideo'
  sys: { id: string }
  title: string
  description?: string
  video: Video
}

export interface ImageMarqueeItem {
  clientName: string
  clientLogo: Asset
  relatedImage: Asset
}

export interface ImageMarquee {
  __typename: 'ImageMarquee'
  sys: { id: string }
  images: {
    items: ImageMarqueeItem[]
  }
}

export type HomePageSection = FeaturedCases | FeaturedVideo | ImageMarquee | Description

export interface HomePage {
  hero: HomeHero
  sections: { items: HomePageSection[] }
}

export interface WorkPage {
  featuredCases: FeaturedCases
  caseArchive: CaseArchive
}

export interface CareersPage {
  hero: PageHero
  sections: {
    items: (TextBlock | IrregularGrid | StickyList)[]
  }
}

export interface FooterData {
  footerHeroText: string
  changingFooterWords: string[]
  skeOfficeName: string
  skeOfficeAddressLineOne: string
  skeOfficeAddressLineTwo: string
  skeOfficeImageGallery: string
  sthlmOfficeName: string
  sthlmOfficeAddressLineOne: string
  sthlmOfficeAddressLineTwo: string
  sthlmOfficeImageGallery: string
  barcelonaOfficeName: string
  barcelonaOfficeAddressLineOne: string
  barcelonaOfficeAddressLineTwo: string
  barcelonaOfficeImageGallery: string
  careersEmail: string
  internEmail: string
  pressEmail: string
  infoPhoneNumber: string
  infoEmail: string
  linkedInLink: string
  twitterLink: string
  instagramLink: string
  facebookLink: string
  noaText: string
}

export interface InfiniteGrid {
  __typename: 'InfiniteGrid'
  sys: { id: string }
  itemsCollection: {
    items: ResponsiveImage[]
  }
}

export interface IrregularGridItem {
  media: Media
  caption: any
}

export interface IrregularGrid {
  __typename: 'IrregularGrid'
  sys: { id: string }
  itemsCollection: {
    items: [IrregularGridItem, IrregularGridItem, IrregularGridItem, IrregularGridItem]
  }
}

// export interface JobPage {
//   header: string
//   generalApplicationCopy: string
//   generalApplicationCta: string
//   otherOpportunitiesHeader: string
//   otherOpportunitiesCopy: string
// }

export interface JournalEntry {
  author: string
  authorRoleAtNk: string
  bodyCopy: string
  media: image[]
  thumbnail: image
  readMoreLink: string
}

export interface JournalPage {
  heading: string
}

export interface SlideBriefSolutionImpact {
  brief: string
  solution: string
  impact: string
}

export interface SlideFullBleed {
  image: image
  shortText: string
}

export interface SlideLegacyDescription {
  header: string
  copy: string
}

export interface SlideQuote {
  quote: string
  author: string
}

export interface SlideSingleImage {
  media: image
  copy: string
}

export interface SlideThreeImages {
  copy: string
  imageOne: image
  imageTwo: image
  imageThree: image
}

export interface SlideThreeStats {
  statOne: string
  statOneDescription: string
  statTwo: string
  statTwoDescription: string
  statThree: string
  statThreeDescription: string
}

export interface SlideTitle {
  image: image
  imageMobile: image
  client: string
  title: string
  description: string
  loopVideo: boolean
  fullScreen: boolean
}

export type Slide = SlideBriefSolutionImpact &
  SlideFullBleed &
  SlideLegacyDescription &
  SlideQuote &
  SlideSingleImage &
  SlideThreeImages &
  SlideThreeStats &
  SlideTitle

export interface Tag {
  name: string
}

export interface TeamTailorJob {
  'end-date'?: string
  'start-date'?: string
  'min-salary'?: string
  'max-salary'?: string
  'apply-button-text': string
  body: string
  'human-status': string
  internal: boolean
  'language-code': ''
  picture: {
    original: string
    standard: string
    thumb: string
  }
  pinned: boolean
  status: string
  tags: []
  title: string
  pitch: string
  'external-application-url': string
  'name-requirement': string
  'resume-requirement': string
  'cover-letter-requirement': string
  'phone-requirement': string
  'created-at': string
  'updated-at': string
  'sharing-image-layout': string
  mailbox: string
  'remote-status': string
  'employment-type': string
  'employment-level': string
  'salary-time-unit': string
  currency: string
  'recruiter-email': string
  location: string
  id: string
}
