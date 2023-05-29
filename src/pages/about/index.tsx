import React from 'react'
import Head from 'next/head'
import client from '@graphql/client'
import { ABOUT_PAGE_QUERY } from '@graphql/queries'
import { About as AboutPageProps } from '@customTypes/cms'
import { PageHero } from '@components/page-hero'
import { List } from '@components/list'
import { StickyListItem } from '@components/sticky-list-item'
import { ThemeChangeTrigger } from '@components/theme-change-trigger'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import styles from './About.module.scss'
import { bemify } from '@utils/bemify'
import { InfiniteGrid } from '@components/infinite-grid'
const bem = bemify(styles, 'about')

const About = ({ hero, list, gridImagesCollection }: AboutPageProps) => {
  return (
    <>
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
      <main className={styles['about']}>
        <PageHero className={bem('pageHeroTitle')} title={hero.title} srcSet={hero.image} />
        <ContentWrapper style={{ position: 'relative', background: 'white' }}>
          <ThemeChangeTrigger theme="light" />
          <List hideBottomBar items={list.itemsCollection.items} renderItem={StickyListItem} />
          {/* TODO :: Add in props here for grid images */}
          {/* <InfiniteGrid images={gridImagesCollection.items}/> */}
        </ContentWrapper>
      </main>
    </>
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
