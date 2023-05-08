import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import style from './404.module.scss'

const Custom404 = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.northkingdom.com/404" />
      </Head>
      <main className={style.container}>
        <h1>Not found</h1>
        <Link href="/">Back</Link>
      </main>
    </>
  )
}

export default Custom404
