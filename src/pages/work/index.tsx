import React from 'react'
import Head from 'next/head'
import client from '@graphql/client'
import { CASE_ARCHIVE_QUERY, WORK_PAGE_QUERY } from '@graphql/queries'
import { HomePage, CaseArchive as CaseArchiveType } from '@customTypes/cms'
import { CaseList } from '@components/case-list'
import { CaseArchive } from '@components/case-archive'

interface WorkPageProps {
  home: Pick<HomePage, 'heroCasesCollection'>
  caseArchive: CaseArchiveType
}

function Work(props: WorkPageProps) {
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
        <CaseList cases={props.home.heroCasesCollection.items} />
        <CaseArchive />
      </main>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const res = await client(false).query({
    query: WORK_PAGE_QUERY,
  })
  const data = res.data

  // const caseArchive = await client.query({
  //   query: CASE_ARCHIVE_QUERY,
  // })

  return {
    props: { ...data },
  }
}
export default Work
