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
    header: 'Extended Reality',
    description: `We have over 10 years of experience creating innovative VR/AR solutions for some of 
the biggest brands in the world on a wide variety of platforms.We've worked with Google, HBO, Disney, McDonalds and more to create cutting
edge AR/VR on web, mobile web, mobile apps and native solutions. We have over 10 years of experience creating
innovative VR/AR solutions for some of the biggest brands in the world on a wide variety of platforms.We've worked
with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and
native solutions.We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web,
mobile web, mobile apps and native solutions.`,
    mediaCollection: {
      items: [
        {
          desktopImage: {
            url: '/dummy/temp-left-riot-img.jpg',
          },
          mobileImage: {
            url: '/dummy/temp-left-riot-img.jpg',
          },
          altText: 'temp alt',
        },
      ],
    },
  },
}

export const WithLink: Story = {
  args: {
    header: 'Extended Reality',
    description: `We have over 10 years of experience creating innovative VR/AR solutions for some of 
the biggest brands in the world on a wide variety of platforms.We've worked with Google, HBO, Disney, McDonalds and more to create cutting
edge AR/VR on web, mobile web, mobile apps and native solutions. We have over 10 years of experience creating
innovative VR/AR solutions for some of the biggest brands in the world on a wide variety of platforms.We've worked
with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and
native solutions.We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web,
mobile web, mobile apps and native solutions.`,
    mediaCollection: {
      items: [
        {
          desktopImage: {
            url: '/dummy/temp-left-riot-img.jpg',
          },
          mobileImage: {
            url: '/dummy/temp-left-riot-img.jpg',
          },
          altText: 'temp alt',
        },
      ],
    },
    link: {
      url: '/about',
      copy: 'Sem mattis View case',
    },
  },
}

export const WithVideo: Story = {
  args: {
    header: 'Extended Reality',
    description: `We have over 10 years of experience creating innovative VR/AR solutions for some of 
the biggest brands in the world on a wide variety of platforms.We've worked with Google, HBO, Disney, McDonalds and more to create cutting
edge AR/VR on web, mobile web, mobile apps and native solutions. We have over 10 years of experience creating
innovative VR/AR solutions for some of the biggest brands in the world on a wide variety of platforms.We've worked
with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and
native solutions.We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web,
mobile web, mobile apps and native solutions.`,
    mediaCollection: {
      items: [
        {
          muted: true,
          autoPlay: true,
          loop: true,
          posterImage: {
            url: '',
          },
          desktopVideoCollection: {
            items: [
              {
                url: '/dummy/showreel23.mp4',
              },
            ],
          },
          mobileVideoCollection: {
            items: [
              {
                url: '/dummy/showreel23.mp4',
              },
            ],
          },
        },
      ],
    },
  },
}

export const WithSlideshow: Story = {
  args: {
    header: 'Extended Reality',
    description: `We have over 10 years of experience creating innovative VR/AR solutions for some of 
the biggest brands in the world on a wide variety of platforms.We've worked with Google, HBO, Disney, McDonalds and more to create cutting
edge AR/VR on web, mobile web, mobile apps and native solutions. We have over 10 years of experience creating
innovative VR/AR solutions for some of the biggest brands in the world on a wide variety of platforms.We've worked
with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and
native solutions.We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web,
mobile web, mobile apps and native solutions.`,
    mediaCollection: {
      items: [
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
  },
}

const awardItems = [
  { awardName: 'FWA of the Day ', count: 54 },
  { awardName: 'FWA of the Month ', count: 11 },
  { awardName: 'Awwwards Site of the Day', count: 3 },
  { awardName: "FWA People's Choice", count: 4 },
  { awardName: 'Red Dot', count: 3 },
  { awardName: 'Awwards Site of the Day', count: 3 },
  { awardName: "FWA People's Choice", count: 4 },
  { awardName: 'Red Dot', count: 3 },
  { awardName: 'Awwards Site of the Day', count: 3 },
  { awardName: "FWA People's Choice", count: 4 },
  { awardName: 'Red Dot', count: 3 },
]

export const WithListInside: Story = {
  args: {
    header: 'Extended Reality',
    description: `We have over 10 years of experience creating innovative VR/AR solutions for some of 
the biggest brands in the world on a wide variety of platforms.We've worked with Google, HBO, Disney, McDonalds and more to create cutting
edge AR/VR on web, mobile web, mobile apps and native solutions. We have over 10 years of experience creating
innovative VR/AR solutions for some of the biggest brands in the world on a wide variety of platforms.We've worked
with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and
native solutions.We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web,
mobile web, mobile apps and native solutions.`,
    mediaCollection: {
      items: [
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
    subList: {
      awards: awardItems,
    },
  },
}
