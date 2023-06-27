import Head from 'next/head'
import React from 'react'
import client from '@graphql/client'
import { CONTACT_PAGE_QUERY, FOOTER_QUERY } from '@graphql/queries'
import { PageHero } from '@components/page-hero'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import { ThemeChangeTrigger } from '@components/theme-change-trigger'
import { List } from '@components/list'
import { bemify } from '@utils/bemify'
import { ContactListItem } from '@components/contact-list-item'
import { OfficeListItem } from '@components/office-list-item'
import { useInViewAnimation } from '@hooks/use-inview-animation'
import styles from './Contact.module.scss'
const bem = bemify(styles, 'contact')

const Contact = ({ hero, contactSectionCollection, officeSectionCollection }: any) => {
  const revealEffectRef = useInViewAnimation('animate-featured-case-fade-up', {
    stagger: true,
    staggerDelay: 0.08,
    initialDelay: 0.1,
    threshold: 0,
  })

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
        <PageHero className={bem('pageHeroTitle')} {...hero} />
        <ContentWrapper theme="dark" notch style={{ paddingTop: `45px` }}>
          <ThemeChangeTrigger theme="dark" />
          <List
            ref={revealEffectRef}
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
  try {
    const res = await client(draftMode).query({ query: CONTACT_PAGE_QUERY(draftMode) })
    const footerRes = await client(draftMode).query({ query: FOOTER_QUERY(draftMode) })

    if (!res.data.contactPage) {
      return { notFound: true }
    } else {
      return { props: { ...res.data.contactPage, footer: footerRes.data.footer } }
    }
  } catch (error) {
    console.error(error)
    return { notFound: true }
  }
}

export default Contact
