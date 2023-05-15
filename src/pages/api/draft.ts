import client from '@graphql/client'
import { CASE_PAGE_QUERY, HOME_PAGE_QUERY, ABOUT_PAGE_QUERY, WORK_PAGE_QUERY } from '../../graphql/queries'

// simple example for testing it manually from your browser.
export default async function handler(req: any, res: any) {
  console.log(`req query`, req.query)

  if (req.query.secret !== process.env.NEXT_PUBLIC_CTF_PREVIEW_TOKEN || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const routeParams = req.query.slug.split('/')
  const contentType = routeParams[1] === '' ? 'home' : routeParams[1]

  let post = null
  let url = null

  switch (contentType) {
    case 'home':
      post = await client(true)
        .query({
          query: HOME_PAGE_QUERY(true),
        })
        .then((res: any) => res.data)
        .then((data: any) => {
          return { props: data.home }
        })
      url = `/`
      break
    case 'case':
      post = await client(true)
        .query({
          query: CASE_PAGE_QUERY(req.query.slug, true),
        })
        .then((res) => res.data)
        .then((data) => {
          return { props: data.caseCollection.items[0] }
        })
      // @ts-ignore
      url = `/case/${post.props.slug}`
      break
    case 'about':
      post = await client(true)
        .query({
          query: ABOUT_PAGE_QUERY(true),
        })
        .then((res: any) => res.data)
        .then((data: any) => {
          return { props: data.about }
        })
      url = `/about`
      break
    case 'work':
      post = await client(true)
        .query({
          query: WORK_PAGE_QUERY(true),
        })
        .then((res: any) => res.data)
        .then((data: any) => {
          return { props: data }
        })
      url = `/work`
      break
    default:
      console.log(`CANT FIND DATA IN CONTENTFUL FOR TYPE: ${contentType}`)
  }

  // If the slug doesn't exist prevent draft mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // Enable Draft Mode by setting the cookie
  res.setDraftMode({ enable: true })

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  // @ts-ignore
  res.redirect(url)
}
