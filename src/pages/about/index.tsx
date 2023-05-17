import React from 'react'
import Head from 'next/head'
import style from './About.module.scss'
import client from '@graphql/client'
import { ABOUT_PAGE_QUERY } from '@graphql/queries'
import { About as AboutPageProps } from '@customTypes/cms'
import { PageHero } from '@components/page-hero'
import styles from './About.module.scss'
import { bemify } from '@utils/bemify'
import { Description } from '@components/description'
import { List } from '@components/list'
import { StickyListItem } from '@components/sticky-list-item'
import { ThemeChangeTrigger } from '@components/theme-change-trigger'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
const bem = bemify(styles, 'about')

const renderAwards = ({ awardName, numberOfAwards }: { awardName: string; numberOfAwards: number }) => {
  console.log()
  return (
    <div
      style={{
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`,
      }}
    >
      <p>{awardName}</p>
      <p>{numberOfAwards}</p>
    </div>
  )
}

const About = (props: AboutPageProps) => {
  return (
    <main className={styles['about']}>
      <Head>
        <title>North Kingdom | About</title>
        <meta property="og:title" content={`North Kingdom | About`} key="ogtitle" />
        <meta name="twitter:title" content={`North Kingdom | About`} key="twittertitle" />

        <meta property="og:image" content="/images/shield.png" key="ogimage" />
        <meta name="twitter:image" content="/images/shield.png" key="twitterimage" />
        <meta property="og:url" content="https://www.northkingdom.com/about/" key="ogurl" />
        <meta property="og:site_name" content="North Kingdom" key="ogsitename" />
        <link rel="canonical" href="https://www.northkingdom.com/about" />
      </Head>
      <main style={{ paddingTop: '80px' }}>
        <PageHero
          className={bem('pageHeroTitle')}
          title={'Creativity & Innovation since 2003'}
          srcSet={{
            desktopImage: {
              url: '/dummy/case-thumb-fallback.webp',
            },
            mobileImage: {
              url: '/dummy/case-thumb-fallback.webp',
            },
            altText: 'temp alt',
          }}
        />
        <ContentWrapper style={{ position: 'relative', background: 'white' }}>
          <ThemeChangeTrigger theme="light" />
          <Description
            header={'About Us'}
            copy={
              'Working at North Kingdom means being part of a team-based culture where diverse talents bring different perspectives and are empowered to act on their combined ideas. Our team consists of passionate, curious, and caring people from 15 different countries around the world.'
            }
          />
          <List
            hideBottomBar
            items={[
              {
                copy: "We have over 10 years of experience creating innovative VR/AR solutions for some of the biggest brands in the world on a wide variety of platforms. We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and native solutions. We have over 10 years of experience creating innovative VR/AR solutions for some of the biggest brands in the world on a wide variety of platforms.We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and native solutions.We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and native solutions.",
                header: 'Extended Reality',
                isVideoAsset: false,
                srcSet: {
                  altText: 'temp alt',
                  desktopImage: {
                    url: '/dummy/temp-left-riot-img.jpg',
                  },
                  mobileImage: {
                    url: '/dummy/temp-left-riot-img.jpg',
                  },
                },
              },
              {
                copy: `Gaming and digital experiences is deeply rooted in our DNA. We have created and injected game elements into our projects over the last 15 years for brands like Vodafone, adidas & Disney. We have created our own games, such as Sparks, and we have worked closely in extending game universes and engaging communities with the biggest gaming players on earth, including EA, Mojang, King, Riot Games, Yuga Labs & Supercell.`,
                header: 'Gaming',
                isVideoAsset: true,
                srcSet: {
                  autoPlay: true,
                  loop: true,
                  muted: true,
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
                copy: 'A amet ridiculus nunc sed. Feugiat facilisis commodo odio quam facilisis non. Odio sagittis bibendum neque id lorem enim eget. ',
                header: 'Awards',
                isVideoAsset: false,
                srcSet: [
                  {
                    altText: 'temp alt',
                    desktopImage: {
                      url: '/dummy/temp-left-riot-img.jpg',
                    },
                    mobileImage: {
                      url: '/dummy/temp-left-riot-img.jpg',
                    },
                  },
                  {
                    altText: 'temp alt',
                    desktopImage: {
                      url: '/dummy/temp-right-riot-img.jpg',
                    },
                    mobileImage: {
                      url: '/dummy/temp-right-riot-img.jpg',
                    },
                  },
                  {
                    altText: 'temp alt',
                    desktopImage: {
                      url: '/dummy/temp-riot-right-image-2.jpg',
                    },
                    mobileImage: {
                      url: '/dummy/temp-riot-right-image-2.jpg',
                    },
                  },
                ],
                containsList: true,
                items: [
                  { awardName: 'FWA of the Day ', numberOfAwards: 54 },
                  { awardName: 'FWA of the Month ', numberOfAwards: 11 },
                  { awardName: 'Awwwards Site of the Day', numberOfAwards: 3 },
                  { awardName: "FWA People's Choice", numberOfAwards: 4 },
                  { awardName: 'Red Dot', numberOfAwards: 3 },
                  { awardName: 'Awwards Site of the Day', numberOfAwards: 3 },
                  { awardName: "FWA People's Choice", numberOfAwards: 4 },
                  { awardName: 'Red Dot', numberOfAwards: 3 },
                  { awardName: 'Awwards Site of the Day', numberOfAwards: 3 },
                  { awardName: "FWA People's Choice", numberOfAwards: 4 },
                  { awardName: 'Red Dot', numberOfAwards: 3 },
                ],
                renderItem: renderAwards,
              },
            ]}
            renderItem={StickyListItem}
          />
        </ContentWrapper>
      </main>
    </main>
  )
}

export async function getStaticProps({ draftMode = false }) {
  return client(draftMode)
    .query({
      query: ABOUT_PAGE_QUERY(draftMode),
    })
    .then((res: any) => res.data)
    .then((data: any) => {
      return { props: data.about }
    })
}
export default About
