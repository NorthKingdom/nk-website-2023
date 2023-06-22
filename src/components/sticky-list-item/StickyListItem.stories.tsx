import type { Meta, StoryObj } from '@storybook/react'
import { StickyListItem } from './StickyListItem'
import { DUMMY_IMAGE, DUMMY_LINK, DUMMY_VIDEO } from '@stories/dummy-data'
import type { AwardListPayload } from '@customTypes/cms'

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
      items: [DUMMY_IMAGE],
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
      items: [DUMMY_IMAGE],
    },
    link: DUMMY_LINK,
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
          ...DUMMY_VIDEO,
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
      items: [DUMMY_IMAGE, DUMMY_IMAGE, DUMMY_IMAGE],
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
        DUMMY_IMAGE,
        {
          ...DUMMY_VIDEO,
          autoPlay: true,
          loop: false,
          muted: true,
        },
        DUMMY_IMAGE,
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
      items: [DUMMY_IMAGE, DUMMY_IMAGE, DUMMY_IMAGE],
    },
    subList: {
      __typename: 'AwardList',
      awards: awardItems,
    } as AwardListPayload,
  },
}
