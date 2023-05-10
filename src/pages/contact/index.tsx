import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import style from './Contact.module.scss'

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
      <main style={{ paddingTop: '80px' }}>
        <h1>Contact</h1>
        <Link href="/">Back</Link>
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
    props: {},
  }
}

export default Contact
