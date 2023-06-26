import Head from 'next/head'
import React from 'react'
import { List } from '@components/list'
import { JobListItem } from '@components/job-list-item'
import { PageHero } from '@components/page-hero'
import { TextBlock } from '@components/text-block'
import { ThemeChangeTrigger } from '@components/theme-change-trigger'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import { CAREERS_PAGE_QUERY, FOOTER_QUERY } from '@graphql/queries'
import client from '@graphql/client'
import { bemify } from '@utils/bemify'
import { LOCATION_ID } from '@constants'
import { IrregularGrid } from '@components/irregular-grid'
import { StickyListItem } from '@components/sticky-list-item'
import { FullbleedMedia } from '@components/fullbleed-media'
import styles from './Careers.module.scss'
import type { CareersPagePayload, IrregularGridPayload, TextBlockPayload } from '@customTypes/cms'
const bem = bemify(styles, 'careers')

interface CareersPageProps extends CareersPagePayload {
  openings: any[]
  numOfOpenings: number
}

const Careers = (pageProps: CareersPageProps) => {
  const { hero, sections, openings } = pageProps
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
        <PageHero className={bem('pageHeroTitle')} {...hero} />
        {(sections.items ?? []).map((section, index) => (
          <CareersPageSectionResolver key={section.sys.id} index={index} pageProps={pageProps} {...section} />
        ))}
        <ContentWrapper theme={'dark'} notch>
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

  const footerRes = await client(draftMode).query({ query: FOOTER_QUERY(draftMode) })

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
              footer: { ...footerRes.data.footer, theme: 'light' },
              ...CMSData.careersPage,
              numOfOpenings: openings.length ?? 0,
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

const CareersPageSectionResolver = ({
  __typename,
  index,
  pageProps,
  ...props
}: {
  __typename: string
  [key: string]: any
}) => {
  switch (__typename) {
    case 'StickyList':
      return (
        <ContentWrapper theme="light" data-use-notch={true}>
          <List
            key={props.sys.id}
            items={props.itemsCollection.items}
            renderItem={StickyListItem}
            hideBottomBar={true}
          />
        </ContentWrapper>
      )
    case 'DescriptionComponent':
      if (index === 0) {
        return (
          <TextBlock key={props.sys.id} {...(props as TextBlockPayload)} className={bem('intro')}>
            <ContentWrapper theme="transparent" className={bem('introOpeningsTeaser')}>
              <p className="t-label">
                {pageProps.numOfOpenings === '1'
                  ? '(↓) 1 current opening'
                  : `(↓) ${pageProps.numOfOpenings ?? 0} current openings`}
              </p>
            </ContentWrapper>
          </TextBlock>
        )
      } else {
        return <TextBlock key={props.sys.id} {...(props as TextBlockPayload)} />
      }
    case 'IrregularGrid':
      return <IrregularGrid key={props.sys.id} items={(props as IrregularGridPayload).itemsCollection.items} />
    case 'ResponsiveImage':
    case 'Video':
      return <FullbleedMedia key={props.sys.id} {...(props as any)} __typename={__typename} />
    default:
      return <></>
  }
}
