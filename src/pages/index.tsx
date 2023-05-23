import Head from 'next/head'
import { HOME_PAGE_QUERY } from '@graphql/queries/HomePage.query'
import client from '@graphql/client'
import { HomePage } from '@customTypes/cms'
import { HomeHero } from '@components/home-hero'
import { CaseList } from '@components/case-list'
import { About } from '@components/about'

const Home = (props: HomePage) => {
  console.log(props)
  return (
    <>
      <Head>
        <title>NK Website 2023</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeHero />
      {/* <CaseList cases={props.heroCasesCollection.items} /> */}
      <About />
    </>
  )
}

export async function getStaticProps({ draftMode = false }) {
  try {
    const res = await client(draftMode).query({
      query: HOME_PAGE_QUERY(draftMode),
    })

    if (!res.data.home) {
      return { notFound: true }
    } else {
      return { props: res.data.home }
    }
  } catch (error) {
    console.error(error)
    return { notFound: true }
  }
}

export default Home
