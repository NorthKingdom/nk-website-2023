import Head from 'next/head'
import { queryContentful } from '@utils/contentful'
import { HOME_PAGE_QUERY } from '@utils/graphql-queries'
import { HomePage } from '@customTypes/cms'
import { HomeHero } from '@components/home-hero'

const Home = (props: HomePage) => {
  console.log(props)

  return (
    <>
      <Head>
        <title>NK Website 2023</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HomeHero />
        <div
          style={{
            height: '300vh',
            width: '100%',
            border: '1px solid red',
          }}
        ></div>
      </main>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  return queryContentful(HOME_PAGE_QUERY).then((data) => {
    console.log(data)
    return {
      props: data.home,
    }
  })
}

export default Home
