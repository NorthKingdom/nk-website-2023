export interface About {
  sectionOneImages: images[]
  sectionOneSubheader: string
  sectionOneHeader: string
  sectionOneCopy: string
  sectionTwoImages: images[]
  sectionTwoSubheader: string
  sectionTwoHeader: string
  sectionTwoCopy: string
  sectionThreeImages: images[]
  sectionThreeSubheader: string
  sectionThreeHeader: string
  sectionThreeCopy: string
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
  thumbnail: image
  thumbnailMobile: image
  projectLink: string
  readMoreLink: string
  public: boolean
  image?: string
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

export interface HomePage {
  aboutNk: string
  heroCasesCollection: {
    items: Case[]
  }
  journalSectionHeading: string
  journalSectionText: string
  infoBlock: FooterData
  linkText: string
  linkImageGallery: LinkImageGallery
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

export interface ImageGallery {
  galleryImage: image[]
}

export interface JobPage {
  header: string
  generalApplicationCopy: string
  generalApplicationCta: string
  otherOpportunitiesHeader: string
  otherOpportunitiesCopy: string
}

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
