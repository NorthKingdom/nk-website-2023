import Head from 'next/head'
import dynamic from 'next/dynamic'
import { HOME_PAGE_QUERY } from '@graphql/queries'
import client from '@graphql/client'
import { HomePage } from '@customTypes/cms'
import { HomeHero } from '@components/home-hero'
import { CaseList } from '@components/case-list'
import type {
  HomeHero as HomeHeroData,
  ImageMarquee as ImageMarqueeData,
  Description as DescriptionData,
} from '@customTypes/cms'
import { ImageMarquee } from '@components/image-marquee'

const Description = dynamic(() => import('@/components/description/Description').then((Mod) => Mod.Description), {
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
    case 'HomeHeroComponent':
      return <HomeHero key={props.sys.id} {...(props as HomeHeroData)} />
    case 'FeaturedCasesComponent':
      return <CaseList key={props.sys.id} cases={props.cases.items} />
    case 'DescriptionComponent':
      return <Description key={props.sys.id} {...(props as DescriptionData)} />
    case 'ImageMarquee':
      return <ImageMarquee key={props.sys.id} {...(props as ImageMarqueeData)} />
    default:
      return <></>
  }
}
