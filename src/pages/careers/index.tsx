import React from 'react'
import Head from 'next/head'
import client from '@graphql/client'
import { CAREERS_PAGE_QUERY } from '@graphql/queries'
import { JobPage, PageHero as PageHeroType, DescriptionComponent } from '@customTypes/cms'
import { List } from '@components/list'
import { JobListItem } from '@components/job-list-item'
import { PageHero } from '@components/page-hero'
import { Description } from '@components/description'
import { ThemeChangeTrigger } from '@components/theme-change-trigger'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import styles from './Careers.module.scss'
import { bemify } from '@utils/bemify'
import { LOCATION_ID } from '@constants'
const bem = bemify(styles, 'careers')

interface JobsPageProp extends JobPage {
  footerTheme: 'light' | 'dark'
  hero: PageHeroType
  introduction: DescriptionComponent
  openings: any[]
}

const Careers = ({ hero, introduction, openings }: JobsPageProp) => {
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
      <main className={styles['careers']}>
        <PageHero className={bem('pageHeroTitle')} title={hero.title} srcSet={hero.image} />
        <ContentWrapper style={{ position: 'relative', background: 'white' }}>
          <ThemeChangeTrigger theme="light" />
          <Description
            theme="light"
            copyLeft={introduction.copyLeft}
            copyRight={introduction.copyRight}
            link={introduction.link}
          />
        </ContentWrapper>
        <ContentWrapper style={{ position: 'relative', background: 'black' }}>
          <ThemeChangeTrigger theme="dark" />
          <h2 className={bem('openings')}>Openings</h2>
          <List
            className={bem('jobList')}
            style={{
              '--list-color': 'white',
            }}
            data-open-application={openings.length === 1}
            items={openings}
            renderItem={JobListItem}
            hideBottomBar
          />
        </ContentWrapper>
      </main>
    </>
  )
}

export async function getServerSideProps({ draftMode = false }) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token token=${process.env.NEXT_PUBLIC_TEAMTAILOR_TOKEN}`)
  myHeaders.append('X-Api-Version', '20210218')
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }
  return client(draftMode)
    .query({
      query: CAREERS_PAGE_QUERY(draftMode),
    })
    .then((res: any) => res.data)
    .then((CMSData: any) => {
      return fetch('https://api.teamtailor.com/v1/jobs?include=role,locations', requestOptions as RequestInit)
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          const openings = result.data.map((job: any) => {
            return {
              title: job.attributes.title,
              url: job.links[`careersite-job-url`],
              locations: job.relationships.locations.data.map(
                (location: any) => LOCATION_ID[location.id as keyof typeof LOCATION_ID]
              ),
            }
          })

          return {
            props: {
              footerTheme: 'light',
              ...CMSData.careersPage,
              openings:
                openings.length > 0
                  ? openings
                  : [
                      {
                        title: 'Open application',
                        locations: ['Skellefteå', 'Stockholm', 'Barcelona'],
                        link: 'https://www.link.com',
                        description:
                          'Although we currently don’t have any open positions, we always welcome applications from talented individuals.',
                      },
                    ],
            },
          }
        })
        .catch((error) => console.log('error', error))
    })
    .catch((error) => console.log('error', error))
}

export default Careers
