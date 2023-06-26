import Head from 'next/head'
import React from 'react'
import client from '@graphql/client'
import { FOOTER_QUERY, WORK_PAGE_QUERY } from '@graphql/queries'
import { CaseList } from '@components/case-list'
import { CaseArchive } from '@components/case-archive'
import type { WorkPagePayload, FeaturedCasesPayload } from '@customTypes/cms'

function Work(props: WorkPagePayload) {
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
        <CaseList
          {...(props.featuredCases as Pick<FeaturedCasesPayload, 'initial' | 'batchSize' | 'enableBatching'>)}
          cases={props.featuredCases.cases.items}
        />
        <CaseArchive />
      </main>
    </>
  )
}

export async function getStaticProps({ draftMode = false }) {
  try {
    const res = await client(draftMode).query({ query: WORK_PAGE_QUERY(draftMode) })
    const footerRes = await client(draftMode).query({ query: FOOTER_QUERY(draftMode) })

    if (!res.data.workPage) {
      return { notFound: true }
    } else {
      return { props: { ...res.data.workPage, footer: footerRes.data.footer } }
    }
  } catch (error) {
    console.error(error)
    return { notFound: true }
  }
}
export default Work
