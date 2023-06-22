import React from 'react'
import Head from 'next/head'
import { gql } from '@apollo/client'
import client from '@graphql/client'
import { RESPONSIVE_IMAGE } from '@graphql/fragments/ResponsiveImage.fragment'
import { PageHero } from '@components/page-hero'
import type { ResponsiveImagePayload } from '@customTypes/cms'

interface FourOhFourProps {
  title: string
  image: ResponsiveImagePayload
}

const ERROR_PAGE_QUERY = (draftMode: boolean) => gql`
  ${RESPONSIVE_IMAGE}

  query ErrorPageQuery {
    errorPage(id: "1f3waB8hHDqowsAW0PEDpe") {
      title
      image {
        ...responsiveImage
      }
    }
  }
`

const Custom404 = ({ title, image }: FourOhFourProps) => {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.northkingdom.com/404" />
      </Head>
      <PageHero
        title={title}
        image={image}
        notch
        link={{
          __typename: 'Link',
          url: '/',
          copy: '← Back to homepage',
        }}
      />
    </>
  )
}
export async function getStaticProps({ draftMode = false }) {
  try {
    const res = await client(draftMode).query({
      query: ERROR_PAGE_QUERY(draftMode),
    })

    return { props: { ...res.data.errorPage, footerTheme: 'light' } }
  } catch (error) {
    console.error(error)
    return { props: { title: '404', footerTheme: 'light', image: null } }
  }
}

export default Custom404
