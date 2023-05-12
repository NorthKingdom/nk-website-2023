import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import client from '@graphql/client'
import { Case as CasePageProps } from '@customTypes/cms'
import { CASE_PAGE_QUERY } from '../../graphql/queries'
import { CaseHero } from '@components/case-hero'
import { motion } from 'framer-motion'
import { GutterWrapper } from '@components/gutter-wrapper'
import { ComponentResolver } from '@components/component-resolver'
import styles from './Case.module.scss'
import { NextCasePreview } from '@components/next-case-preview'

const Loading = () => {
  return (
    <div
      style={{
        backgroundColor: 'pink',
        position: 'absolute',
        zIndex: 5,
        top: 0,
        left: 0,
        width: `100vw`,
        height: `100vh`,
        display: `flex`,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>LOADING</h1>
    </div>
  )
}

const Case = (props: CasePageProps) => {
  const [showPage, setShowPage] = useState(false)

  useEffect(() => {
    if (props) {
      document.querySelector('#__next')!.scrollTo(0, 0)
      setTimeout(() => {
        setShowPage(true)
      }, 1000)
    }
  }, [props])
  return (
    <>
      {!showPage && <Loading />}

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
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          transition={{ duration: 1 }}
          className={styles['case']}
          style={{
            backgroundColor: props.backgroundColor?.value || `#FFF`,
            color: props.backgroundColor?.value === '#000000' ? '#FFF' : '#000',
          }}
        >
          <CaseHero
            client={props.client}
            caseName={props.title}
            src={props.componentsCollection?.items[0].heroMedia}
            isVideoAsset={props.componentsCollection?.items[0].heroMedia.__typename === 'Video'}
          />
          <GutterWrapper size="small">
            <ComponentResolver components={props.componentsCollection?.items || []} />
          </GutterWrapper>
          {showPage && <NextCasePreview caseTitle={'Masterclash'} client={'Riot'} src={'/dummy/temp-riot-1.jpg'} />}
        </motion.main>
      </>
    </>
  )
}

export async function getStaticProps({ params, draftMode = false }: { params: { case: string }; draftMode: boolean }) {
  return client(draftMode)
    .query({
      query: CASE_PAGE_QUERY(params.case, draftMode),
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
