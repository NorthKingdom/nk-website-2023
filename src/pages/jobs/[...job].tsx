import React from 'react'
import Head from 'next/head'
import { TeamTailorJob, FooterData } from '@customTypes/cms'
import Link from 'next/link'

interface JobDescriptionProps extends TeamTailorJob {
  sendTo404?: boolean
  applicationUrl: string
  footerData: FooterData
}

const JobDescription = (props: JobDescriptionProps) => {
  return (
    <>
      <Head>
        <title>{`North Kingdom | Jobs ${props.title ? `- ${props.title}` : ''}`}</title>
        <meta
          property="og:title"
          content={`North Kingdom | Jobs ${props.title ? `- ${props.title}` : ''}`}
          key="ogtitle"
        />
        <meta
          name="twitter:title"
          content={`North Kingdom | Jobs ${props.title ? `- ${props.title}` : ''}`}
          key="twittertitle"
        />

        <meta property="og:image" content="/images/shield.png" key="ogimage" />
        <meta name="twitter:image" content="/images/shield.png" key="twitterimage" />
        <meta
          property="og:url"
          content={`https://www.northkingdom.com/jobs/${encodeURIComponent(
            props.location ? props.location.replace(/\//g, ` `).trim().toLowerCase().replace(/ +/g, '-') : ''
          )}-${encodeURIComponent(
            props.title ? props.title.replace(/-/g, ` `).trim().toLowerCase().replace(/ +/g, '-') : ''
          )}`}
          key="ogurl"
        />
        <meta property="og:site_name" content="North Kingdom" key="ogsitename" />
        <link
          rel="canonical"
          href={`https://www.northkingdom.com/jobs/${encodeURIComponent(
            props.location ? props.location.replace(/\//g, ` `).trim().toLowerCase().replace(/ +/g, '-') : ''
          )}-${encodeURIComponent(
            props.title ? props.title.replace(/-/g, ` `).trim().toLowerCase().replace(/ +/g, '-') : ''
          )}`}
        />
      </Head>
      <main>
        <h1>Job description page</h1>
        <Link href="/">Back</Link>
      </main>
    </>
  )
}

export async function getStaticProps({
  params,
}: {
  params: {
    job: string[]
  }
}) {
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
  // /*
  //  * TODO :: if we have two job posts for the same role (one in each branch)
  //  * then it will just show you skelleftea if you go to /all/<job-title>
  //  */
  // const locationFromParam = params.job[0] as 'stockholm' | 'skellefteå' | 'all'
  // return fetch(
  //   `https://api.teamtailor.com/v1/jobs?filter[locations]=${LOCATION_ID[locationFromParam]}`,
  //   requestOptions as RequestInit
  // )
  //   .then((response) => {
  //     return response.json()
  //   })
  //   .then((result) => {
  //     const jobTitles = result.data.map((i: any) =>
  //       i.attributes.title.replace(/-/g, ` `).trim().toLowerCase().replace(/ +/g, '-')
  //     )
  //     let jobIndex = -1
  //     for (let i = 0; i < jobTitles.length; i++) {
  //       if (params.job[1] === jobTitles[i]) {
  //         jobIndex = i
  //         break
  //       }
  //     }
  //     return fetch(`https://api.teamtailor.com/v1/jobs/${result.data[jobIndex].id}`, requestOptions as RequestInit)
  //       .then((response) => {
  //         return response.json()
  //       })
  //       .then((result) => {
  //         return fetch(result.data.relationships.locations.links.related, requestOptions as RequestInit)
  //           .then((response) => {
  //             return response.json()
  //           })
  //           .then((locationData) => {
  //             return getFooter().then((footerData) => {
  //               return {
  //                 props: {
  //                   id: result.data.id,
  //                   location: locationData.data
  //                     .reduce((previousValue: string, item: any) => (previousValue += item.attributes.city + ' / '), '')
  //                     .slice(0, -2),
  //                   applicationUrl: result.data.links['careersite-job-apply-url'],
  //                   ...result.data.attributes,
  //                   ...footerData,
  //                 },
  //               }
  //             })
  //           })
  //       })
  //   })
  //   .catch((e) => {
  //     console.log(e)
  //     return {
  //       props: {
  //         sendTo404: true,
  //       },
  //     }
  //   })
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          job: [`skellefteå`, `ux-designer`],
        },
      },
      {
        params: {
          job: [`stockholm`, `frontend-developer`],
        },
      },
      {
        params: {
          job: [`stockholm`, `digital-producer`],
        },
      },
      {
        params: {
          job: [`skellefteå`, `frontend-developer`],
        },
      },
      {
        params: {
          job: [`all`, `internship-frontend-developers`],
        },
      },
      {
        params: {
          job: [`stockholm`, `ux-designer`],
        },
      },
      {
        params: {
          job: [`stockholm`, `senior-designer`],
        },
      },
      {
        params: {
          job: [`skellefteå`, `senior-designer`],
        },
      },
    ],
    fallback: true,
  }
}

export default JobDescription
