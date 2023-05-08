import React from 'react'
import Head from 'next/head'
import style from './About.module.scss'
import Link from 'next/link'

const About = () => {
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
  return {
    props: {},
  }
}

export default About
