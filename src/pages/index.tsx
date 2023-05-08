import Head from 'next/head'
import Link from 'next/link'
import { queryContentful } from '@utils/contentful'
import { HOME_PAGE_QUERY } from '@utils/graphql-queries'
import { HomePage } from '@customTypes/cms'

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
        <h1>Home page</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Link href="/about">About</Link>
          <Link href="/work">Work</Link>
          <Link href="/jobs">Careers</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  return queryContentful(HOME_PAGE_QUERY).then((data) => {
    return {
      props: data.home,
    }
  })
}

export default Home
