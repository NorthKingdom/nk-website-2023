import React from 'react'
import Head from 'next/head'
import client from '@graphql/client'
import { Case as CasePageProps } from '@customTypes/cms'
import { CASE_PAGE_QUERY } from '../../graphql/queries'
import { CaseHero } from '@components/case-hero'
import { GutterWrapper } from '@components/gutter-wrapper'
import { ComponentResolver } from '@components/component-resolver'
import styles from './Case.module.scss'

const Case = (props: CasePageProps) => {
  return (
    <>
      <Head>
        <title>{`North Kingdom | ${props.title}`}</title>
        <meta property="og:title" content={`North Kingdom | ${props.title}`} key="ogtitle" />
        <meta name="twitter:title" content={`North Kingdom | ${props.title}`} key="twittertitle" />

        <meta
          name="description"
          content={props.slides && props.slides.length > 1 ? props.slides[1].solution || props.slides[1].copy : null}
          key="description"
        />

        <meta
          property="og:description"
          content={props.slides && props.slides.length > 1 ? props.slides[1].solution || props.slides[1].copy : null}
          key="ogdescription"
        />
        <meta
          name="twitter:description"
          content={props.slides && props.slides.length > 1 ? props.slides[1].solution || props.slides[1].copy : null}
          key="twitterdescription"
        />
        {/* TODO :: Add back in an OG image for the Case */}
        {/* 
        <meta
          property="og:image"
          content={`${
            props.slides
              ? props.slides[0].image.includes(`image`)
                ? props.slides[0].image
                : props.slides[0].imageMobile
              : null
          }`}
          key="ogimage"
        />
        <meta
          name="twitter:image"
          content={`${
            props.slides
              ? props.slides[0].image.includes(`image`)
                ? props.slides[0].image
                : props.slides[0].imageMobile
              : null
          }`}
          key="twitterimage"
        /> */}

        <meta
          content={`https://www.northkingdom.com/case/${encodeURIComponent(props.slug)}`}
          property="og:url"
          key="ogurl"
        />
        <meta property="og:site_name" content="North Kingdom" key="ogsitename" />
        <link href={`https://www.northkingdom.com/case/${encodeURIComponent(props.slug)}`} rel="canonical" />
      </Head>
      <main className={styles['case']}>
        <CaseHero
          client={props.client}
          caseName={props.title}
          src={props.componentsCollection?.items[0].heroMedia}
          isVideoAsset={props.componentsCollection?.items[0].heroMedia.__typename === 'Video'}
        />
        <GutterWrapper size="small">
          <ComponentResolver components={props.componentsCollection?.items || []} />
        </GutterWrapper>
      </main>
    </>
  )
}

export async function getStaticProps({ params, preview = false }: { params: { case: string }; preview: boolean }) {
  return client
    .query({
      query: CASE_PAGE_QUERY(params.case),
    })
    .then((res) => res.data)
    .then((data) => {
      return { props: data.caseCollection.items[0] }
    })
}

type paramsType = {
  params: {
    case: string
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
  // const casePaths: paramsType[] = []
  // return getAllCases(false).then((cases) => {
  //   cases.forEach((c: CaseType) => casePaths.push({ params: { case: c.slug } }))
  //   return {
  //     paths: casePaths,
  //     fallback: true,
  //   }
  // })
}

export default Case
