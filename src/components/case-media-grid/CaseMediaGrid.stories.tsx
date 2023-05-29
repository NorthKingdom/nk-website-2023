import type { Meta, StoryObj } from '@storybook/react'
import { CaseMediaGrid } from './CaseMediaGrid'

const meta: Meta<typeof CaseMediaGrid> = {
  title: 'UI/CaseMediaGrid',
  component: CaseMediaGrid,
  tags: ['autodocs'],
  parameters: { layout: `fullscreen` },
}

export default meta
type Story = StoryObj<typeof CaseMediaGrid>

export const Default: Story = {
  args: {
    slotOne: {
      media: {
        __typename: 'ResponsiveImage',
        desktopImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        mobileImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        altText: '[EXAMPLE] riot image',
      },
      offset: '0%',
    },

    slotTwo: {
      media: {
        __typename: 'ResponsiveImage',
        desktopImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        mobileImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        altText: '[EXAMPLE] riot image',
      },
      offset: '0%',
    },
    slotThree: {
      media: {
        __typename: 'ResponsiveImage',
        desktopImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        mobileImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        altText: '[EXAMPLE] riot image',
      },
      offset: '0%',
    },
    slotFour: {
      media: {
        __typename: 'ResponsiveImage',
        desktopImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        mobileImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        altText: '[EXAMPLE] riot image',
      },
      offset: '0%',
    },
  },
}

export const WithoutTwo: Story = {
  args: {
    slotOne: {
      media: {
        __typename: 'ResponsiveImage',
        desktopImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        mobileImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        altText: '[EXAMPLE] riot image',
      },
      offset: `0%`,
    },
    slotThree: {
      media: {
        __typename: 'ResponsiveImage',
        desktopImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        mobileImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        altText: '[EXAMPLE] riot image',
      },
      offset: '0%',
    },
    slotFour: {
      media: {
        __typename: 'ResponsiveImage',
        desktopImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        mobileImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        altText: '[EXAMPLE] riot image',
      },
      offset: '25%',
    },
  },
}

export const WithOneVideo: Story = {
  args: {
    slotOne: {
      media: {
        __typename: 'ResponsiveImage',
        desktopImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        mobileImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        altText: '[EXAMPLE] riot image',
      },
      offset: '0%',
    },

    slotThree: {
      media: {
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
        autoPlay: false,
        loop: false,
        muted: true,
      },
      offset: '50%',
    },
    slotFour: {
      media: {
        __typename: 'ResponsiveImage',
        desktopImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        mobileImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        altText: '[EXAMPLE] riot image',
      },
      offset: '0%',
    },
  },
}
