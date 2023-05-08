import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
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
