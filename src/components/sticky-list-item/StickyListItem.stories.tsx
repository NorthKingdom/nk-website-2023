import type { Meta, StoryObj } from '@storybook/react'
import { StickyListItem } from './StickyListItem'

const meta: Meta<typeof StickyListItem> = {
  title: 'UI/StickyListItem',
  component: StickyListItem,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof StickyListItem>

export const Default: Story = {
  args: {
    isVideoAsset: false,
    header: 'Extended Reality',
    copy: `We have over 10 years of experience creating innovative VR/AR solutions for some of 
the biggest brands in the world on a wide variety of platforms.We've worked with Google, HBO, Disney, McDonalds and more to create cutting
edge AR/VR on web, mobile web, mobile apps and native solutions. We have over 10 years of experience creating
innovative VR/AR solutions for some of the biggest brands in the world on a wide variety of platforms.We've worked
with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and
native solutions.We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web,
mobile web, mobile apps and native solutions.`,
    srcSet: {
      desktopImage: {
        url: '/dummy/temp-left-riot-img.jpg',
      },
      mobileImage: {
        url: '/dummy/temp-left-riot-img.jpg',
      },
      altText: 'temp alt',
    },
  },
}

export const WithVideo: Story = {
  args: {
    isVideoAsset: true,
    header: 'Extended Reality',
    copy: `We have over 10 years of experience creating innovative VR/AR solutions for some of 
the biggest brands in the world on a wide variety of platforms.We've worked with Google, HBO, Disney, McDonalds and more to create cutting
edge AR/VR on web, mobile web, mobile apps and native solutions. We have over 10 years of experience creating
innovative VR/AR solutions for some of the biggest brands in the world on a wide variety of platforms.We've worked
with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and
native solutions.We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web,
mobile web, mobile apps and native solutions.`,
    srcSet: {
      muted: true,
      autoPlay: true,
      loop: true,
      posterImage: {
        url: '',
      },
      mobileVideoCollection: { items: [] },
      desktopVideoCollection: {
        items: [
          {
            url: '/dummy/showreel23.mp4',
          },
        ],
      },
    },
  },
}

export const WithSlideshow: Story = {
  args: {
    isVideoAsset: false,
    header: 'Extended Reality',
    copy: `We have over 10 years of experience creating innovative VR/AR solutions for some of 
the biggest brands in the world on a wide variety of platforms.We've worked with Google, HBO, Disney, McDonalds and more to create cutting
edge AR/VR on web, mobile web, mobile apps and native solutions. We have over 10 years of experience creating
innovative VR/AR solutions for some of the biggest brands in the world on a wide variety of platforms.We've worked
with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and
native solutions.We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web,
mobile web, mobile apps and native solutions.`,
    srcSet: [
      {
        desktopImage: {
          url: '/dummy/temp-left-riot-img.jpg',
        },
        mobileImage: {
          url: '/dummy/temp-left-riot-img.jpg',
        },
        altText: 'temp alt',
      },
      {
        desktopImage: {
          url: '/dummy/temp-right-riot-img.jpg',
        },
        mobileImage: {
          url: '/dummy/temp-right-riot-img.jpg',
        },
        altText: 'temp alt',
      },
      {
        desktopImage: {
          url: '/dummy/temp-riot-right-image-2.jpg',
        },
        mobileImage: {
          url: '/dummy/temp-riot-right-image-2.jpg',
        },
        altText: 'temp alt',
      },
    ],
  },
}

const awardItems = [
  { awardName: 'FWA of the Day ', number: 54 },
  { awardName: 'FWA of the Month ', number: 11 },
  { awardName: 'Awwwards Site of the Day', number: 3 },
  { awardName: "FWA People's Choice", number: 4 },
  { awardName: 'Red Dot', number: 3 },
  { awardName: 'Awwards Site of the Day', number: 3 },
  { awardName: "FWA People's Choice", number: 4 },
  { awardName: 'Red Dot', number: 3 },
  { awardName: 'Awwards Site of the Day', number: 3 },
  { awardName: "FWA People's Choice", number: 4 },
  { awardName: 'Red Dot', number: 3 },
]

const renderAwards = ({ awardName, number }: (typeof awardItems)[0]) => {
  return (
    <div
      style={{
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`,
      }}
    >
      <p>{awardName}</p>
      <p>{number}</p>
    </div>
  )
}

export const WithListInside: Story = {
  args: {
    isVideoAsset: false,
    header: 'Extended Reality',
    copy: `We have over 10 years of experience creating innovative VR/AR solutions for some of 
the biggest brands in the world on a wide variety of platforms.We've worked with Google, HBO, Disney, McDonalds and more to create cutting
edge AR/VR on web, mobile web, mobile apps and native solutions. We have over 10 years of experience creating
innovative VR/AR solutions for some of the biggest brands in the world on a wide variety of platforms.We've worked
with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and
native solutions.We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web,
mobile web, mobile apps and native solutions.`,
    srcSet: [
      {
        desktopImage: {
          url: '/dummy/temp-left-riot-img.jpg',
        },
        mobileImage: {
          url: '/dummy/temp-left-riot-img.jpg',
        },
        altText: 'temp alt',
      },
      {
        desktopImage: {
          url: '/dummy/temp-right-riot-img.jpg',
        },
        mobileImage: {
          url: '/dummy/temp-right-riot-img.jpg',
        },
        altText: 'temp alt',
      },
      {
        desktopImage: {
          url: '/dummy/temp-riot-right-image-2.jpg',
        },
        mobileImage: {
          url: '/dummy/temp-riot-right-image-2.jpg',
        },
        altText: 'temp alt',
      },
    ],
    containsList: true,
    items: awardItems,
    renderItem: renderAwards,
  },
}
