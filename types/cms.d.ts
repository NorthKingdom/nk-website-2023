/**
 * GUIDELINES
 * 1. All types should be PascalCase
 * 2. All CMS types should have a '__typename' property
 * 3. All types should be prefixed with the name of the content type they are used for
 * 4. All types should be suffixed with the word 'Payload' to avoid naming conflicts with corresponding components (e.g. 'CasePayload' type vs 'Case' component)
 */

export interface AssetPayload {
  __typename: 'Asset'
  url: string
}

export interface PageHeroPayload {
  __typename: 'PageHero'
  title: string
  image?: ResponsiveImagePayload
  link?: LinkPayload
}

export interface TextBlockPayload {
  __typename: 'DescriptionComponent'
  sys: { id: string }
  heading?: string
  copyLeft?: string
  copyRight?: string
  link?: LinkPayload
}

export interface MediaGridItemPayload {
  __typename: 'MediaGridItem'
  media: MediaPayload
  offset: '0%' | '25%' | '50%'
}

export interface AboutPagePayload {
  __typename: 'About'
  hero: PageHeroPayload
  sections: {
    items: (TextBlockPayload | InfiniteGridPayload | IrregularGridPayload | StickyListPayload)[]
  }
}

export interface LinkPayload {
  __typename: 'Link'
  copy: string
  url: string
}

export interface ClipboardCopyItemPayload {
  __typename: 'ClipboardCopyItem'
  label: string
  content: string
  hoverLabel?: string
  confirmationLabel?: string
}

export interface VideoPayload {
  __typename: 'Video'
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
}

export interface ResponsiveImagePayload {
  __typename: 'ResponsiveImage'
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
}

export type MediaPayload = ResponsiveImagePayload | VideoPayload

export interface StickyListPayload {
  __typename: 'StickyList'
  sys: { id: string }
  itemsCollection: {
    items: StickyListItemPayload[]
  }
}

export interface StickyListItemPayload {
  __typename: 'StickyListItem'
  header: string
  description: string
  mediaCollection: {
    items: MediaPayload[]
  }
  link?: LinkPayload
}

export interface AwardListPayload {
  __typename: 'AwardList'
  awards: AwardPayload[]
}

export interface AwardPayload {
  __typename: 'Award'
  awardName: string
  count: number
}

export interface CaseHeroPayload {
  __typename: 'CaseHero'
  heroMedia: MediaPayload
}

export interface TwoImageComponentPayload {
  __typename: 'TwoImageComponent'
  imageOne: ResponsiveImagePayload
  imageOneCaption?: string
  imageTwo: ResponsiveImagePayload
  imageTwoCaption?: string
}

export interface CaseMediaGridPayload {
  __typename: 'CaseMediaGrid'
  slotOne?: MediaGridItemPayload
  slotTwo?: MediaGridItemPayload
  slotThree?: MediaGridItemPayload
  slotFour?: MediaGridItemPayload
}

export interface CasePayload {
  __typename: 'Case'
  title: string
  slides: SlidesPayload[]
  date: any
  vertical: string
  client: string
  capability: string
  tags: TagsPayload[]
  slug: string
  thumbnail: VideoPayload | ResponsiveImagePayload
  thumbnailMobile: VideoPayload | ResponsiveImagePayload
  projectLink: string
  readMoreLink: string
  public: boolean
  image?: string
  componentsCollection: {
    items: (
      | CaseHeroPayload
      | TextBlockPayload
      | ResponsiveImagePayload
      | VideoPayload
      | TwoImageComponentPayload
      | CaseMediaGridPayload
    )[]
  }
  backgroundColor?: {
    value: string
  }
}

export interface CaseArchiveItemPayload extends Pick<Case, 'title' | 'date' | 'client' | 'projectLink' | 'vertical'> {
  sys: { id: string }
}

export interface CaseArchivePayload {
  total: number
  items: CaseArchiveItemPayload[]
}
export interface HomeHeroPayload {
  __typename: 'HomeHeroComponent'
  sys: { id: string }
  statement: string
  shieldVideo: VideoPayload
  showreelVideo: VideoPayload
  shieldLightLeakColorVtt: {
    url: string
    contentType: string
  }
}

export interface FeaturedCasesPayload {
  __typename: 'FeaturedCasesComponent'
  sys: { id: string }
  initial: number
  enableBatching: boolean
  batchSize: number
  cases: { items: Case[] }
}

export interface FeaturedVideoPayload {
  __typename: 'FeaturedVideo'
  sys: { id: string }
  title: string
  description?: string
  video: VideoPayload
}

export interface ImageMarqueeItemPayload {
  __typename: 'ImageMarqueeItem'
  clientName: string
  clientLogo: Asset
  relatedImage: AssetPayload
}

export interface ImageMarqueePayload {
  __typename: 'ImageMarquee'
  sys: { id: string }
  images: {
    items: ImageMarqueeItemPayload[]
  }
}

export type HomePageSectionPayload =
  | FeaturedCasesPayload
  | FeaturedVideoPayload
  | ImageMarqueePayload
  | DescriptionPayload

export interface HomePagePayload {
  __typename: 'HomePage'
  hero: HomeHeroPayload
  sections: { items: HomePageSectionPayload[] }
}

export interface WorkPagePayload {
  __typename: 'WorkPage'
  featuredCases: FeaturedCasesPayload
  caseArchive: CaseArchivePayload
}

export interface CareersPagePayload {
  __typename: 'CareersPage'
  hero: PageHeroPayload
  sections: {
    items: (TextBlockPayload | IrregularGridPayload | StickyListPayload)[]
  }
}

export interface InfiniteGridPayload {
  __typename: 'InfiniteGrid'
  sys: { id: string }
  itemsCollection: {
    items: ResponsiveImagePayload[]
  }
}

export interface IrregularGridItemPayload {
  __typename: 'IrregularGridItem'
  media: MediaPayload
  caption?: string
}

export interface IrregularGridPayload {
  __typename: 'IrregularGrid'
  sys: { id: string }
  itemsCollection: {
    items: [IrregularGridItemPayload, IrregularGridItemPayload, IrregularGridItemPayload, IrregularGridItemPayload]
  }
}

export interface FooterPayload {
  __typename: 'Footer'
  statement: string
}

export interface TagPayload {
  __typename: 'Tag'
  name: string
}

// TODO: review if this is needed?

export interface TeamTailorJobPayload {
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
