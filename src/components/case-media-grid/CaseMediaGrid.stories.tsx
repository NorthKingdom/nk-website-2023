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
        desktopImage: {
          url: `/dummy/portrait-media.jpg`,
        },
        mobileImage: {
          url: `/dummy/portrait-media.jpg`,
        },
        altText: 'temp alt',
      },
      offset: '0%',
    },

    slotTwo: {
      media: {
        desktopImage: {
          url: `/dummy/landscape-media.jpg`,
        },
        mobileImage: {
          url: `/dummy/landscape-media.jpg`,
        },
        altText: 'temp alt',
      },
      offset: '0%',
    },
    slotThree: {
      media: {
        desktopImage: {
          url: `/dummy/portrait-media.jpg`,
        },
        mobileImage: {
          url: `/dummy/portrait-media.jpg`,
        },
        altText: 'temp alt',
      },
      offset: '0%',
    },
    slotFour: {
      media: {
        desktopImage: {
          url: `/dummy/landscape-media.jpg`,
        },
        mobileImage: {
          url: `/dummy/landscape-media.jpg`,
        },
        altText: 'temp alt',
      },
      offset: '0%',
    },
  },
}

export const WithoutTwo: Story = {
  args: {
    slotOne: {
      media: {
        desktopImage: {
          url: `/dummy/portrait-media.jpg`,
        },
        mobileImage: {
          url: `/dummy/portrait-media.jpg`,
        },
        altText: 'temp alt',
      },
      offset: '0%',
    },
    slotThree: {
      media: {
        desktopImage: {
          url: `/dummy/portrait-media.jpg`,
        },
        mobileImage: {
          url: `/dummy/portrait-media.jpg`,
        },
        altText: 'temp alt',
      },
      offset: '0%',
    },
    slotFour: {
      media: {
        desktopImage: {
          url: `/dummy/landscape-media.jpg`,
        },
        mobileImage: {
          url: `/dummy/landscape-media.jpg`,
        },
        altText: 'temp alt',
      },
      offset: '25%',
    },
  },
}

export const WithOneVideo: Story = {
  args: {
    slotOne: {
      media: {
        desktopImage: {
          url: `/dummy/portrait-media.jpg`,
        },
        mobileImage: {
          url: `/dummy/portrait-media.jpg`,
        },
        altText: 'temp alt',
      },
      offset: '0%',
    },

    slotThree: {
      media: {
        muted: true,
        autoPlay: true,
        loop: true,
        posterImage: {
          url: `/dummy/showreelposter.jpg`,
        },
        desktopVideoCollection: {
          items: [
            {
              url: `/dummy/showreel23.mp4`,
            },
          ],
        },
        mobileVideoCollection: {
          items: [
            {
              url: `/dummy/showreel23.mp4`,
            },
          ],
        },
      },
      offset: '50%',
    },
    slotFour: {
      media: {
        desktopImage: {
          url: `/dummy/landscape-media.jpg`,
        },
        mobileImage: {
          url: `/dummy/landscape-media.jpg`,
        },
        altText: 'temp alt',
      },
      offset: '0%',
    },
  },
}
