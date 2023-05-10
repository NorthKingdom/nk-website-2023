import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import style from './Work.module.scss'

function Work() {
  return (
    <>
      <Head>
        <title>North Kingdom | Collections</title>
        <meta property="og:title" content="North Kingdom | Collections" key="ogtitle" />
        <meta name="twitter:title" content="North Kingdom | Collections" key="twittertitle" />
        <meta property="og:image" content="/images/shield.png" key="ogimage" />
        <meta name="twitter:image" content="/images/shield.png" key="twitterimage" />
        <meta property="og:url" content={`https://www.northkingdom.com/work/`} key="ogurl" />
        <meta property="og:site_name" content="North Kingdom" key="ogsitename" />
        <link rel="canonical" href="https://www.northkingdom.com/work" />
      </Head>
      <main style={{ paddingTop: '80px' }}>
        <h1>Work</h1>
        <Link href="/">Back</Link>
      </main>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  return {
    props: {},
  }
  //   return getCollectionsPage(preview).then((data) => {
  //     data.collections.map((coll) => (coll.cases = coll.cases.sort(() => Math.random() - Math.random()).slice(0, 10)))
  //     return {
  //       props: {
  //         collections: data.collections,
  //       },
  //     }
  //   })
}

export default Work
