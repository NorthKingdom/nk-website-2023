import Head from 'next/head'
import { HOME_PAGE_QUERY } from '@graphql/queries'
import client from '@graphql/client'
import { HomePage } from '@customTypes/cms'
import { HomeHero } from '@components/home-hero'
import { CaseList } from '@components/case-list'
import { About } from '@components/about'

const Home = (props: HomePage) => {
  return (
    <>
      <Head>
        <title>NK Website 2023</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeHero />
      <CaseList cases={props.heroCasesCollection.items} />
      <About />
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  return client
    .query({
      query: HOME_PAGE_QUERY,
    })
    .then((res: any) => res.data)
    .then((data: any) => {
      return { props: data.home }
    })
}

export default Home
