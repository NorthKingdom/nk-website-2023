import React, { useEffect, useLayoutEffect } from 'react'
import Head from 'next/head'
import client from '@graphql/client'
import { CaseHero as CaseHeroType, Case as CasePageProps } from '@customTypes/cms'
import { CASE_PAGE_QUERY, WORK_PAGE_QUERY, NEXT_CASES_QUERY } from '../../graphql/queries'
import { CaseHero } from '@components/case-hero'
import { ComponentResolver } from '@components/component-resolver'
import { useGlobalStateStore } from '@store/global-state-store'
import styles from './Case.module.scss'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import Lenis from '@studio-freight/lenis'
import { useQuery } from '@apollo/client'
import { NextCasePreview } from '@components/next-case-preview'
import { useRouter } from 'next/router'

const Case = (props: CasePageProps) => {
  const router = useRouter()
  const lenis = useGlobalStateStore((state) => state.lenis) as Lenis
  const featuredCases = useGlobalStateStore((state) => state.featuredCases)
  const setFeaturedCases = useGlobalStateStore((state) => state.setFeaturedCases)
  const isComingFromACasePage = useGlobalStateStore((state) => state.isComingFromACasePage)
  // const lenis = useGlobalStateStore((state) => state.lenis) as Lenis

  useEffect(() => {
    console.log(`featuedcases: `, featuredCases)
    const a = async () => {
      return client(false)
        .query({
          query: NEXT_CASES_QUERY(false),
        })
        .then((res: any) => res.data)
        .then((data: any) => {
          console.log(data)

          setFeaturedCases(data.workPage.featuredCases.cases.items)
        })
    }
    if (featuredCases.length === 0) {
      a()
    }
  }, [featuredCases])

  useLayoutEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
      lenis.stop()
    }
  }, [lenis])

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
          {featuredCases.length > 0 && (
            <NextCasePreview
              caseName={props.title === '[EXAMPLE] Masterclash' ? '[EXAMPLE] RiotX Arcane' : '[EXAMPLE] Masterclash'}
              src={
                props.title === '[EXAMPLE] Masterclash'
                  ? featuredCases[0].componentsCollection.items[0].heroMedia
                  : featuredCases[1].componentsCollection.items[0].heroMedia
              }
            />
          )}
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
