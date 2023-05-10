import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import style from './Jobs.module.scss'
import { JobPage, TeamTailorJob } from '@customTypes/cms'

interface JobsPageProp extends JobPage {
  jobs: TeamTailorJob[]
  images: string[]
}

const Jobs = (props: JobsPageProp) => {
  return (
    <>
      <Head>
        <title>North Kingdom | Jobs</title>
        <meta property="og:title" content="North Kingdom | Jobs" key="ogtitle" />
        <meta name="twitter:title" content="North Kingdom | Jobs" key="twittertitle" />

        <meta property="og:image" content="/images/shield.png" key="ogimage" />
        <meta name="twitter:image" content="/images/shield.png" key="twitterimage" />
        <meta property="og:url" content={`https://www.northkingdom.com/jobs/`} key="ogurl" />
        <meta property="og:site_name" content="North Kingdom" key="ogsitename" />
        <link rel="canonical" href="https://www.northkingdom.com/jobs" />
      </Head>
      <main style={{ paddingTop: '80px' }}>
        <h1>Jobs page</h1>
        <Link href="/">Back</Link>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {},
  }

  // var myHeaders = new Headers()
  // myHeaders.append('Authorization', `Token token=${process.env.NEXT_PUBLIC_TEAMTAILOR_TOKEN}`)
  // myHeaders.append('X-Api-Version', '20210218')
  // var requestOptions = {
  //   method: 'GET',
  //   headers: myHeaders,
  //   redirect: 'follow',
  // }

  // return fetch('https://api.teamtailor.com/v1/jobs', requestOptions as RequestInit)
  //   .then((response) => {
  //     return response.json()
  //   })
  //   .then((result) => {
  //     let resultData = result.data
  //     return Promise.all(
  //       resultData.map((job: any) => {
  //         return fetch(job.relationships.locations.links.related, requestOptions as RequestInit)
  //           .then((res) => res.json())
  //           .then((locationData) => {
  //             return locationData.data.length > 1
  //               ? locationData.data
  //                   .reduce((previousValue: string, item: any) => (previousValue += item.attributes.city + ' / '), '')
  //                   .slice(0, -2)
  //               : locationData.data.length === 0
  //               ? ``
  //               : locationData.data[0].attributes.city
  //           })
  //       })
  //     ).then((cities) => {
  //       let jobs: TeamTailorJob[] = resultData.map((job: any) => job.attributes)

  //       jobs.forEach((job, i) => {
  //         job.location = cities[i]
  //         job.id = resultData[i].id
  //       })

  //       return Promise.all([getAboutPage(), getJobPage()]).then(([aboutPageData, contentfulData]) => {
  //         return {
  //           props: {
  //             jobs,
  //             ...contentfulData,
  //             images: aboutPageData.sectionTwoImages.sort(() => Math.random() - Math.random()).slice(0, 10),
  //           },
  //         }
  //       })
  //     })
  //   })
  //   .catch((error) => console.log('error', error))
}

export default Jobs
