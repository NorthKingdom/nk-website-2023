import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import client from '@graphql/client'
import { CaseHero as CaseHeroType, Case as CasePageProps } from '@customTypes/cms'
import { CASE_PAGE_QUERY } from '../../graphql/queries'
import { CaseHero } from '@components/case-hero'
import { ComponentResolver } from '@components/component-resolver'
import { useGlobalStateStore } from '@store/global-state-store'
import styles from './Case.module.scss'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import { NextCasePreview } from '@components/next-case-preview'
import Lenis from '@studio-freight/lenis'

const Case = (props: CasePageProps) => {
  const lenis = useGlobalStateStore((state) => state.lenis) as Lenis

  useEffect(() => {
    if (lenis) {
      console.log(`USE EFFECT LENIS SCROLL TOP `)
      lenis.scrollTo(0, { immediate: true })
      lenis.stop()
      setTimeout(() => {
        lenis.start()
      }, 200)
    }
  }, [lenis])

  // console.log(props)

  return (
    props.componentsCollection?.items.length > 0 && (
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
            src={(props.componentsCollection?.items[0] as CaseHeroType).heroMedia}
          />
          <ContentWrapper>
            <ComponentResolver components={props.componentsCollection?.items || []} />
          </ContentWrapper>
          <NextCasePreview
            caseTitle={props.client === 'Supercell' ? '[EXAMPLE] RiotX Arcane' : '[EXAMPLE] Masterclash'}
            client={props.client === 'Supercell' ? 'RIOT' : 'Supercell'}
            src={'/dummy/riotxarcane-map.jpg'}
          />
        </main>
      </>
    )
  )
}

export async function getStaticProps({ params, draftMode = false }: { params: { case: string }; draftMode: boolean }) {
  return client(draftMode)
    .query({
      query: CASE_PAGE_QUERY(params.case, draftMode),
    })
    .then((res) => res.data)
    .then((data) => {
      return {
        props: {
          hideFooter: true,
          ...data.caseCollection.items[0],
        },
      }
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
