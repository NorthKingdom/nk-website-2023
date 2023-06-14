import React from 'react'
import Head from 'next/head'
import client from '@graphql/client'
import { CONTACT_PAGE_QUERY } from '@graphql/queries'
import { PageHero } from '@components/page-hero'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import { ThemeChangeTrigger } from '@components/theme-change-trigger'
import { List } from '@components/list'
import styles from './Contact.module.scss'
import { bemify } from '@utils/bemify'
import { ContactListItem } from '@components/contact-list-item'
import { OfficeListItem } from '@components/office-list-item'
const bem = bemify(styles, 'contact')

const Contact = ({ hero, contactSectionCollection, officeSectionCollection }: any) => {
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
        <PageHero className={bem('pageHeroTitle')} title={hero.title} srcSet={hero.image} />
        <ContentWrapper theme="dark" notch style={{ paddingTop: `45px` }}>
          <ThemeChangeTrigger theme="dark" />
          <List
            hideAllBars
            style={{
              '--list-color': 'white',
            }}
            items={contactSectionCollection.items}
            renderItem={ContactListItem}
          />
        </ContentWrapper>

        <ContentWrapper theme="light" notch style={{ paddingTop: `120px` }}>
          <ThemeChangeTrigger theme="light" />
          <List hideBottomBar items={officeSectionCollection.items} renderItem={OfficeListItem} />
        </ContentWrapper>
      </main>
    </>
  )
}

export async function getStaticProps({ draftMode = false }) {
  return client(draftMode)
    .query({
      query: CONTACT_PAGE_QUERY(draftMode),
    })
    .then((res: any) => res.data)
    .then((data: any) => {
      return { props: data.contactPage }
    })
}

export default Contact
