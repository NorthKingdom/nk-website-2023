import React from 'react'
import Head from 'next/head'
import client from '@graphql/client'
import { WORK_PAGE_QUERY } from '@graphql/queries'
import type { WorkPage } from '@customTypes/cms'
import { CaseList } from '@components/case-list'
import { CaseArchive } from '@components/case-archive'

function Work(props: WorkPage) {
  return (
    <>
      <Head>
        <title>North Kingdom | Work</title>
        <meta property="og:title" content="North Kingdom | Work" key="ogtitle" />
        <meta name="twitter:title" content="North Kingdom | Work" key="twittertitle" />
        <meta property="og:image" content="/images/shield.png" key="ogimage" />
        <meta name="twitter:image" content="/images/shield.png" key="twitterimage" />
        <meta property="og:url" content={`https://www.northkingdom.com/work/`} key="ogurl" />
        <meta property="og:site_name" content="North Kingdom" key="ogsitename" />
        <link rel="canonical" href="https://www.northkingdom.com/work" />
      </Head>
      <main style={{ paddingTop: '80px' }}>
        <CaseList cases={props.featuredCases.cases.items} />
        <CaseArchive />
      </main>
    </>
  )
}

export async function getStaticProps({ draftMode = false }) {
  try {
    const res = await client(draftMode).query({
      query: WORK_PAGE_QUERY(draftMode),
    })

    if (!res.data.workPage) {
      return { notFound: true }
    } else {
      return { props: res.data.workPage }
    }
  } catch (error) {
    console.error(error)
    return { notFound: true }
  }
}
export default Work
