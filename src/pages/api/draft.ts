import client from '@graphql/client'
import { CASE_PAGE_QUERY } from '../../graphql/queries'

// simple example for testing it manually from your browser.
export default async function handler(req: any, res: any) {
  console.log(`req query`, req.query)

  if (req.query.secret !== process.env.NEXT_PUBLIC_CTF_PREVIEW_TOKEN || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS

  const post = await client(true)
    .query({
      query: CASE_PAGE_QUERY(req.query.slug, true),
    })
    .then((res) => res.data)
    .then((data) => {
      return { props: data.caseCollection.items[0] }
    })

  // If the slug doesn't exist prevent draft mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // Enable Draft Mode by setting the cookie
  res.setDraftMode({ enable: true })

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  // @ts-ignore
  res.redirect(`/case/${post.props.slug}`)
}
