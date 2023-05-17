import React from 'react'
import Head from 'next/head'
import { PageHero } from '@components/page-hero'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import { ThemeChangeTrigger } from '@components/theme-change-trigger'
import { List } from '@components/list'
import styles from './Contact.module.scss'
import { bemify } from '@utils/bemify'
import { ContactListItem } from '@components/contact-list-item'
import { OfficeListItem } from '@components/office-list-item'
const bem = bemify(styles, 'contact')

// TODO :: move to props from CMS
const contactInformation = [
  {
    header: 'General enquiries',
    information: 'info@northkingdom.com',
  },
  {
    header: 'New business',
    information: 'business@northkingdom.com',
  },
  {
    header: 'Jobs',
    information: 'info@northkingdom.com',
  },
  {
    header: 'Social',
    information: 'Twitter',
  },
]

// TODO :: move to props from CMS
const officeInformation = [
  {
    officeName: 'Stockholm',
    addressLineOne: 'Tulegatan 13',
    addressLineTwo: 'Stockholm 113 53',
    country: 'Sweden',
    directionsLink: 'https://www.maps.google.com',
  },
  {
    officeName: 'Skellefteå',
    addressLineOne: 'Storgatan 32',
    addressLineTwo: 'Skellefteå 931 31',
    country: 'Sweden',
    directionsLink: 'https://www.maps.google.com',
  },
  {
    officeName: 'Barcelona',
    addressLineOne: 'Carrer del Consell de Cent 413-415',
    addressLineTwo: 'Barcelona 08009',
    country: 'Spain',
    directionsLink: 'https://www.maps.google.com',
  },
]

function Contact() {
  return (
    <>
      <Head>
        <title>North Kingdom | Contact</title>
        <meta property="og:title" content="North Kingdom | Contact" key="ogtitle" />
        <meta name="twitter:title" content="North Kingdom | Contact" key="twittertitle" />
        <meta property="og:image" content="/images/shield.png" key="ogimage" />
        <meta name="twitter:image" content="/images/shield.png" key="twitterimage" />
        <meta property="og:url" content={`https://www.northkingdom.com/contact/`} key="ogurl" />
        <meta property="og:site_name" content="North Kingdom" key="ogsitename" />
        <link rel="canonical" href="https://www.northkingdom.com/contact" />
      </Head>
      <main className={styles['contact']}>
        <PageHero
          className={bem('pageHeroTitle')}
          title={"Let's make something great"}
          srcSet={{
            desktopImage: {
              url: '/dummy/case-thumb-fallback.webp',
            },
            mobileImage: {
              url: '/dummy/case-thumb-fallback.webp',
            },
            altText: 'temp alt',
          }}
        />
        <ContentWrapper style={{ position: 'relative', background: 'white', paddingTop: `45px` }}>
          <ThemeChangeTrigger theme="light" />
          <List hideBottomBar items={contactInformation} renderItem={ContactListItem} />
        </ContentWrapper>

        <ContentWrapper style={{ position: 'relative', background: 'black', paddingTop: `120px` }}>
          <ThemeChangeTrigger theme="dark" />
          <List
            hideBottomBar
            style={{
              '--list-color': 'white',
            }}
            items={officeInformation}
            renderItem={OfficeListItem}
          />
        </ContentWrapper>
      </main>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  // TODO :: Create Contact Page in Contentful
  // return queryContentful(HOME_PAGE_QUERY).then((data) => {
  //   console.log(data)

  //   return {
  //     props: data.home,
  //   }
  // })
  return {
    props: {
      footerTheme: 'light',
    },
  }
}

export default Contact
