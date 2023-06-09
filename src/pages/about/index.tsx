import React from 'react'
import Head from 'next/head'
import style from './About.module.scss'
import Link from 'next/link'
import { queryContentful } from '@utils/contentful'
import { ABOUT_PAGE_QUERY } from '@utils/graphql-queries'
import { About as AboutPageProps } from '@customTypes/cms'

const About = (props: AboutPageProps) => {
  return (
    <main className={style.aboutContainer}>
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
      <h1>About</h1>
      <Link href="/">Back</Link>
    </main>
  )
}

export async function getStaticProps({ preview = false }) {
  return queryContentful(ABOUT_PAGE_QUERY).then((data) => {
    return {
      props: data.about,
    }
  })
}

export default About
