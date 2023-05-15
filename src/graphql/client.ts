import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const createContentfulhttpLink = (draftMode: boolean) =>
  createHttpLink({
    fetch,
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CTF_SPACE_TOKEN}/environments/${process.env.NEXT_PUBLIC_CTF_ENVIRONMENT}`,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${
        draftMode ? process.env.NEXT_PUBLIC_CTF_PREVIEW_TOKEN : process.env.NEXT_PUBLIC_CTF_ACCESS_TOKEN
      }`,
    },
  })

const client = (draftMode: boolean) => {
  return new ApolloClient({
    link: createContentfulhttpLink(draftMode),
    cache: new InMemoryCache(),
  })
}
export default client
