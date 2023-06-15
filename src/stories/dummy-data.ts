import { Video, ResponsiveImage } from '@customTypes/cms'

export const DUMMY_VIDEO: Video = {
  __typename: 'Video',
  muted: true,
  autoPlay: true,
  loop: true,
  posterImage: {
    url: '/dummy/showreelposter.jpg',
  },
  desktopVideoCollection: {
    items: [
      {
        url: '/dummy/EA_NFS_Heat_Studio_case_study_30s.mp4',
        contentType: 'video/mp4',
        width: 1280,
        height: 720,
      },
    ],
  },
  mobileVideoCollection: {
    items: [
      {
        url: '/dummy/EA_NFS_Heat_Studio_case_study_30s.mp4',
        contentType: 'video/mp4',
        width: 1280,
        height: 720,
      },
    ],
  },
}

export const DUMMY_IMAGE: ResponsiveImage = {
  __typename: 'ResponsiveImage',
  desktopImage: {
    url: '/dummy/landscape-media.jpg',
    width: 1440,
    height: 810,
  },
  mobileImage: {
    url: '/dummy/landscape-media.jpg',
    width: 1440,
    height: 810,
  },
  altText: '[EXAMPLE] riot image',
}

export const DUMMY_IMAGE_ALT_1: ResponsiveImage = {
  __typename: 'ResponsiveImage',
  desktopImage: {
    url: '/dummy/temp-right-riot-img.jpg',
    width: 1400,
    height: 786,
  },
  mobileImage: {
    url: '/dummy/temp-right-riot-img.jpg',
    width: 1400,
    height: 786,
  },
  altText: 'temp alt',
}

export const DUMMY_IMAGE_ALT_2: ResponsiveImage = {
  __typename: 'ResponsiveImage',
  desktopImage: {
    url: '/dummy/temp-riot-right-image-2.jpg',
    width: 690,
    height: 517,
  },
  mobileImage: {
    url: '/dummy/temp-riot-right-image-2.jpg',
    width: 690,
    height: 517,
  },
  altText: 'temp alt',
}
