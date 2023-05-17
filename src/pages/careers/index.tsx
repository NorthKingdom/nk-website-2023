import React from 'react'
import Head from 'next/head'
import { JobPage, TeamTailorJob } from '@customTypes/cms'
import { List } from '@components/list'
import { JobListItem } from '@components/job-list-item'
import { PageHero } from '@components/page-hero'
import { Description } from '@components/description'
import { StickyListItem } from '@components/sticky-list-item'
import { ThemeChangeTrigger } from '@components/theme-change-trigger'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import styles from './Careers.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'careers')

interface JobsPageProp extends JobPage {
  jobs: TeamTailorJob[]
  images: string[]
  openings: any[]
}

const Careers = (props: JobsPageProp) => {
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
        <PageHero
          className={bem('pageHeroTitle')}
          title={'Be apart of our kingdom'}
          srcSet={{
            desktopImage: {
              url: '/dummy/temp-riot-hero-image.jpg',
            },
            mobileImage: {
              url: '/dummy/temp-riot-hero-image.jpg',
            },
            altText: 'temp alt',
          }}
        />
        <ContentWrapper style={{ position: 'relative', background: 'white' }}>
          <ThemeChangeTrigger theme="light" />
          <Description
            theme="light"
            header={'4 current openings'}
            copy={
              'Working at North Kingdom means being part of a team-based culture where diverse talents bring different perspectives and are empowered to act on their combined ideas. Our team consists of passionate, curious, and caring people from 15 different countries around the world.'
            }
          />
          <List
            items={[
              {
                copy: "We have over 10 years of experience creating innovative VR/AR solutions for some of \nthe biggest brands in the world on a wide variety of platforms.We've worked with Google, HBO, Disney, McDonalds and more to create cutting\nedge AR/VR on web, mobile web, mobile apps and native solutions. We have over 10 years of experience creating\ninnovative VR/AR solutions for some of the biggest brands in the world on a wide variety of platforms.We've worked\nwith Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and\nnative solutions.We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web,\nmobile web, mobile apps and native solutions.",
                header: 'Extended Reality',
                isVideoAsset: false,
                srcSet: {
                  altText: 'temp alt',
                  desktopImage: {
                    url: '/dummy/temp-left-riot-img.jpg',
                  },
                  mobileImage: {
                    url: '/dummy/temp-left-riot-img.jpg',
                  },
                },
              },
              {
                copy: "We have over 10 years of experience creating innovative VR/AR solutions for some of\n  the biggest brands in the world on a wide variety of platforms.We've worked with Google, HBO, Disney, McDonalds and more to create cutting\n  edge AR/VR on web, mobile web, mobile apps and native solutions. We have over 10 years of experience creating\n  innovative VR/AR solutions for some of the biggest brands in the world on a wide variety of platforms.We've worked\n  with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and\n  native solutions.We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web,\n  mobile web, mobile apps and native solutions.",
                header: 'Extended Reality',
                isVideoAsset: true,
                srcSet: {
                  autoPlay: true,
                  loop: true,
                  muted: true,
                  posterImage: {
                    url: '/dummy/showreelposter.jpg',
                  },
                  srcCollection: {
                    items: [
                      {
                        url: '/dummy/showreel23.mp4',
                      },
                    ],
                  },
                },
              },
              {
                copy: "We have over 10 years of experience creating innovative VR/AR solutions for some of\n  the biggest brands in the world on a wide variety of platforms.We've worked with Google, HBO, Disney, McDonalds and more to create cutting\n  edge AR/VR on web, mobile web, mobile apps and native solutions. We have over 10 years of experience creating\n  innovative VR/AR solutions for some of the biggest brands in the world on a wide variety of platforms.We've worked\n  with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and\n  native solutions.We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web,\n  mobile web, mobile apps and native solutions.",
                header: 'Extended Reality',
                isVideoAsset: false,
                automaticallyChange: true,
                showIndicators: true,
                showArrows: true,
                srcSet: [
                  {
                    altText: 'temp alt',
                    desktopImage: {
                      url: '/dummy/temp-left-riot-img.jpg',
                    },
                    mobileImage: {
                      url: '/dummy/temp-left-riot-img.jpg',
                    },
                  },
                  {
                    altText: 'temp alt',
                    desktopImage: {
                      url: '/dummy/temp-right-riot-img.jpg',
                    },
                    mobileImage: {
                      url: '/dummy/temp-right-riot-img.jpg',
                    },
                  },
                  {
                    altText: 'temp alt',
                    desktopImage: {
                      url: '/dummy/temp-riot-right-image-2.jpg',
                    },
                    mobileImage: {
                      url: '/dummy/temp-riot-right-image-2.jpg',
                    },
                  },
                ],
              },
            ]}
            renderItem={StickyListItem}
            hideBottomBar
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
            data-open-application={props.openings.length === 1}
            items={props.openings}
            renderItem={JobListItem}
            hideBottomBar
          />
        </ContentWrapper>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token token=${process.env.NEXT_PUBLIC_TEAMTAILOR_TOKEN}`)
  myHeaders.append('X-Api-Version', '20210218')
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }

  return fetch('https://api.teamtailor.com/v1/jobs', requestOptions as RequestInit)
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      return {
        props: {
          footerTheme: 'light',
          openings:
            result.data.length > 0
              ? result.data
              : [
                  {
                    title: 'Open application',
                    location: 'Sweden/Barcelona',
                    link: 'https://www.link.com',
                    description:
                      'Although we currently don’t have any open positions, we always welcome applications from talented individuals.',
                  },
                ],
        },
      }
      // let resultData = result.data
      // return Promise.all(
      //   resultData.map((job: any) => {
      //     return fetch(job.relationships.locations.links.related, requestOptions as RequestInit)
      //       .then((res) => res.json())
      //       .then((locationData) => {
      //         return locationData.data.length > 1
      //           ? locationData.data
      //               .reduce((previousValue: string, item: any) => (previousValue += item.attributes.city + ' / '), '')
      //               .slice(0, -2)
      //           : locationData.data.length === 0
      //           ? ``
      //           : locationData.data[0].attributes.city
      //       })
      //   })
      // ).then((cities) => {
      //   let jobs: TeamTailorJob[] = resultData.map((job: any) => job.attributes)

      //   jobs.forEach((job, i) => {
      //     job.location = cities[i]
      //     job.id = resultData[i].id
      //   })

      //   return Promise.all([getAboutPage(), getJobPage()]).then(([aboutPageData, contentfulData]) => {
      //     return {
      //       props: {
      //         jobs,
      //         ...contentfulData,
      //         images: aboutPageData.sectionTwoImages.sort(() => Math.random() - Math.random()).slice(0, 10),
      //       },
      //     }
      //   })
      // })
    })
    .catch((error) => console.log('error', error))
}

export default Careers
