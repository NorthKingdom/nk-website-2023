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
          __typename: 'ResponsiveImage',
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
          __typename: 'ResponsiveImage',
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
          __typename: 'Video',

          desktopVideoCollection: {
            items: [
              {
                contentType: 'video/mp4',
                url: 'https://videos.ctfassets.net/vwfx2n1hr26h/3zwFhCKXIUlzPlzSaTGxO8/1ad6725f1c0344b6a65a6ecb364270a1/MasterClash-Cover.mp4',
              },
            ],
          },
          mobileVideoCollection: {
            items: [],
          },
          posterImage: {
            url: 'https://images.ctfassets.net/vwfx2n1hr26h/JKz0VPSPjmlmBWemMJEYL/099bec4f033daa34a345fa77afd561f4/masterclash_thumbnail_mobile.jpg',
          },
          autoPlay: true,
          loop: false,
          muted: true,
        },
      ],
    },
  },
}

export const WithImageSlideshow: Story = {
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
          __typename: 'ResponsiveImage',
          desktopImage: {
            url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
          },
          mobileImage: {
            url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
          },
          altText: '[EXAMPLE] riot image',
        },
        {
          __typename: 'ResponsiveImage',
          desktopImage: {
            url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
          },
          mobileImage: {
            url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
          },
          altText: '[EXAMPLE] riot image',
        },
        {
          __typename: 'ResponsiveImage',
          desktopImage: {
            url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
          },
          mobileImage: {
            url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
          },
          altText: '[EXAMPLE] riot image',
        },
      ],
    },
  },
}

export const WithImageAndVideoSlideshow: Story = {
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
          __typename: 'ResponsiveImage',
          desktopImage: {
            url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
          },
          mobileImage: {
            url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
          },
          altText: '[EXAMPLE] riot image',
        },
        {
          __typename: 'Video',

          desktopVideoCollection: {
            items: [
              {
                contentType: 'video/mp4',
                url: 'https://videos.ctfassets.net/vwfx2n1hr26h/3zwFhCKXIUlzPlzSaTGxO8/1ad6725f1c0344b6a65a6ecb364270a1/MasterClash-Cover.mp4',
              },
            ],
          },
          mobileVideoCollection: {
            items: [],
          },
          posterImage: {
            url: 'https://images.ctfassets.net/vwfx2n1hr26h/JKz0VPSPjmlmBWemMJEYL/099bec4f033daa34a345fa77afd561f4/masterclash_thumbnail_mobile.jpg',
          },
          autoPlay: true,
          loop: false,
          muted: true,
        },
        {
          __typename: 'ResponsiveImage',
          desktopImage: {
            url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
          },
          mobileImage: {
            url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
          },
          altText: '[EXAMPLE] riot image',
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
          __typename: 'ResponsiveImage',
          desktopImage: {
            url: '/dummy/temp-left-riot-img.jpg',
          },
          mobileImage: {
            url: '/dummy/temp-left-riot-img.jpg',
          },
          altText: 'temp alt',
        },
        {
          __typename: 'ResponsiveImage',
          desktopImage: {
            url: '/dummy/temp-right-riot-img.jpg',
          },
          mobileImage: {
            url: '/dummy/temp-right-riot-img.jpg',
          },
          altText: 'temp alt',
        },
        {
          __typename: 'ResponsiveImage',
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
