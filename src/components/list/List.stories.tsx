import type { Meta, StoryObj } from '@storybook/react'
import { List } from './List'
import { StickyListItem } from '@components/sticky-list-item'
import { JobListItem } from '@components/job-list-item'
import { ResponsiveImage, Video } from '@customTypes/cms'
import { AwardItem } from '@components/award-item'

const meta: Meta<typeof List> = {
  title: 'UI/List',
  component: List,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof List>

const items = Array.from({ length: 10 }, (_, i) => ({ label: String(i) }))
const renderItem = ({ label }: { label: string }) => <div>{label}</div>

export const Default: Story = {
  args: {
    items,
    renderItem,
  },
}

export const DarkTheme: Story = {
  parameters: { theme: 'dark' },
  args: {
    items,
    renderItem,
  },
  render: () => (
    <List
      style={{
        '--list-color': 'white',
      }}
      items={items}
      renderItem={renderItem}
    />
  ),
}

export const WithoutBottomBar: Story = {
  args: {
    items,
    renderItem,
    hideBottomBar: true,
  },
}

const complexItems = Array.from({ length: 10 }, (_, i) => ({
  year: 2010 + i,
  project: `Project ${i}`,
  description: `Description ${i}`,
}))

const renderComplexItem = ({ year, project, description }: (typeof complexItems)[0]) => (
  <div style={{ display: 'flex', width: '100%' }}>
    <div style={{ marginRight: '20px', width: '80px' }}>{year}</div>
    <div>{project}</div>
    <div style={{ marginLeft: 'auto' }}>{description}</div>
  </div>
)

export const ComplexItems: Story = {
  args: {
    items: complexItems,
    renderItem: renderComplexItem,
  },
}

const stickyItems = [
  {
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
      ] as ResponsiveImage[],
    },
  },
  {
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
            url: '/dummy/showreelposter.jpg',
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
      ] as Video[],
    },
  },
  {
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
      ] as ResponsiveImage[],
    },
  },
]

const renderStickyItems = ({ mediaCollection, header, description }: (typeof stickyItems)[0]) => (
  // @ts-ignore
  <StickyListItem header={header} description={description} mediaCollection={mediaCollection} />
)

export const StickyItems: Story = {
  args: {
    items: stickyItems,
    renderItem: renderStickyItems,
  },
}

const awardItems = {
  awards: [
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
  ],
}

const stickyItemsWithListInLastOne = [
  ...stickyItems.map((i) => ({
    ...i,
    subList: {
      awards: [],
    },
    items: [],
    renderItem: () => <div />,
  })),
  {
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
      ] as ResponsiveImage[],
    },
    subList: awardItems,
    renderItem: AwardItem,
  },
]

const renderStickyItemsWithInternalList = ({
  header,
  description,
  mediaCollection,
  subList,
}: (typeof stickyItemsWithListInLastOne)[0]) => (
  <StickyListItem header={header} description={description} mediaCollection={mediaCollection} subList={subList} />
)

export const StickyItemsWithListInside: Story = {
  args: {
    items: stickyItemsWithListInLastOne,
    renderItem: renderStickyItemsWithInternalList,
  },
}

const jobOpenings = [
  {
    title: 'Senior Developer',
    locations: ['Stockholm', 'Skellefteå'],
    url: 'https//www.example-url.com',
  },
  {
    title: 'Design Intern',
    locations: ['Stockholm', 'Barcelona'],
    url: 'https//www.example-url.com',
  },
  {
    title: 'Development Intern',
    locations: ['Stockholm', 'Barcelona'],
    url: 'https//www.example-url.com',
  },
  {
    title: 'Producer',
    locations: ['Stockholm', 'Barcelona'],
    url: 'https//www.example-url.com',
  },
]

const renderJobOpenings = ({ title, locations, url }: (typeof jobOpenings)[0]) => (
  <JobListItem title={title} locations={locations} url={url} />
)

export const JobOpenings: Story = {
  args: {
    items: jobOpenings,
    renderItem: renderJobOpenings,
    hideBottomBar: true,
  },
}
