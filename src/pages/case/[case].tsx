import { useQuery } from '@apollo/client'
import Lenis from '@studio-freight/lenis'
import Head from 'next/head'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CaseHero } from '@components/case-hero'
import { ComponentResolver } from '@components/component-resolver'
import { useGlobalStateStore } from '@store/global-state-store'
import client from '@graphql/client'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import { NextCasePreview } from '@components/next-case-preview'
import { CASE_PAGE_QUERY, NEXT_CASES_QUERY } from '../../graphql/queries'
import styles from './Case.module.scss'
import type { CaseHeroPayload, CasePayload } from '@customTypes/cms'

const Case = (props: CasePayload) => {
  const router = useRouter()
  const lenis = useGlobalStateStore((state) => state.lenis) as Lenis
  const featuredCases = useGlobalStateStore((state) => state.featuredCases)
  const setFeaturedCases = useGlobalStateStore((state) => state.setFeaturedCases)
  const [nextIndex, setNextIndex] = useState(-1)

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
    } else {
      console.log(props.title)
      const index = featuredCases.findIndex((c) => c.title === props.title)
      console.log(index)
      setNextIndex(index + 1 === featuredCases.length ? 0 : index + 1)
      console.log(
        featuredCases[index + 1],
        featuredCases[index + 1].componentsCollection,
        featuredCases[index + 1].componentsCollection.items
      )
    }
  }, [featuredCases, props.title])

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
            media={(props.componentsCollection?.items[0] as CaseHeroPayload).heroMedia}
          />
          <ContentWrapper>
            <ComponentResolver components={props.componentsCollection?.items || []} />
          </ContentWrapper>
          {featuredCases.length > 0 && nextIndex !== -1 && (
            <NextCasePreview
              caseName={featuredCases[nextIndex].title}
              nextSlug={featuredCases[nextIndex].slug}
              src={
                featuredCases[nextIndex].componentsCollection.items.length > 0
                  ? featuredCases[nextIndex].componentsCollection.items[0].heroMedia
                  : `/dummy/grid/grid-image-11.jpg`
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
