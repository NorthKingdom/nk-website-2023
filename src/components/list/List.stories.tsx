import type { Meta, StoryObj } from '@storybook/react'
import { List } from './List'
import { StickyListItem } from '@components/sticky-list-item'

const meta: Meta<typeof List> = {
  title: 'UI/List',
  component: List,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof List<any>>

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
  {
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
        url: '/dummy/showreelposter.jpg',
      },
      srcCollection: {
        items: [
          {
            url: '/dummy/showreel23.mp4',
          },
        ],
      },
    },
  },
  {
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
]

const renderStickyItems = ({ isVideoAsset, header, copy, srcSet }: (typeof stickyItems)[0]) => (
  <StickyListItem isVideoAsset={isVideoAsset} header={header} copy={copy} srcSet={srcSet} />
)

export const StickyItems: Story = {
  args: {
    items: stickyItems,
    renderItem: renderStickyItems,
  },
}
