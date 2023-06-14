import Head from 'next/head'
import dynamic from 'next/dynamic'
import { HOME_PAGE_QUERY } from '@graphql/queries'
import client from '@graphql/client'
import { HomePage, FeaturedCases } from '@customTypes/cms'
import { HomeHero } from '@components/home-hero'
import { CaseList } from '@components/case-list'
import type { ImageMarquee as ImageMarqueeData, TextBlock as TextBlockData } from '@customTypes/cms'
import { ImageMarquee } from '@components/image-marquee'

const TextBlock = dynamic(() => import('@/components/text-block/TextBlock').then((Mod) => Mod.TextBlock), {
  ssr: false,
})

const Home = (props: HomePage) => {
  return (
    <>
      <Head>
        <title>North Kingdom Website</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/shield.ico" />
      </Head>
      <HomeHero key={props.hero.sys.id} {...props.hero} />
      {(props.sections.items ?? []).map((section) => (
        <HomePageSectionResolver key={section.sys.id} {...section} />
      ))}
    </>
  )
}

export async function getStaticProps({ draftMode = false }) {
  try {
    const res = await client(draftMode).query({
      query: HOME_PAGE_QUERY(draftMode),
    })

    if (!res.data.home) {
      return { notFound: true }
    } else {
      return { props: res.data.home }
    }
  } catch (error) {
    console.error(error)
    return { notFound: true }
  }
}

export default Home

const HomePageSectionResolver = ({ __typename, ...props }: { __typename: string; [key: string]: any }) => {
  switch (__typename) {
    case 'FeaturedCasesComponent':
      return (
        <CaseList
          key={props.sys.id}
          {...(props as Pick<FeaturedCases, 'initial' | 'batchSize' | 'enableBatching'>)}
          cases={props.cases.items}
        />
      )
    case 'DescriptionComponent':
      return <TextBlock key={props.sys.id} {...(props as TextBlockData)} notch />
    case 'ImageMarquee':
      return <ImageMarquee key={props.sys.id} {...(props as ImageMarqueeData)} />
    default:
      return <></>
  }
}
