import React from 'react'
import Head from 'next/head'
import client from '@graphql/client'
import { ABOUT_PAGE_QUERY } from '@graphql/queries'
import type {
  About as AboutPageProps,
  InfiniteGrid as InfiniteGridProps,
  IrregularGrid as IrregularGridProps,
  TextBlock as TextBlockProps,
} from '@customTypes/cms'
import { PageHero } from '@components/page-hero'
import { List } from '@components/list'
import { StickyListItem } from '@components/sticky-list-item'
import styles from './About.module.scss'
import { bemify } from '@utils/bemify'
import { InfiniteGrid } from '@components/infinite-grid'
import { TextBlock } from '@components/text-block'
import { IrregularGrid } from '@components/irregular-grid'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
const bem = bemify(styles, 'about')

const About = ({ hero, ...props }: AboutPageProps) => {
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
        {(props.sections.items ?? []).map((section) => (
          <AboutPageSectionResolver key={section.sys.id} {...section} />
        ))}
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

const AboutPageSectionResolver = ({ __typename, ...props }: { __typename: string; [key: string]: any }) => {
  switch (__typename) {
    case 'StickyList':
      return (
        <ContentWrapper theme="light">
          <List key={props.sys.id} items={props.itemsCollection.items} renderItem={StickyListItem} hideBottomBar />
        </ContentWrapper>
      )
    case 'DescriptionComponent':
      return <TextBlock key={props.sys.id} {...(props as TextBlockProps)} notch />
    case 'InfiniteGrid':
      return <InfiniteGrid key={props.sys.id} images={(props as InfiniteGridProps).itemsCollection.items} />
    case 'IrregularGrid':
      return <IrregularGrid key={props.sys.id} media={(props as IrregularGridProps).itemsCollection.items} />
    default:
      return <></>
  }
}
