import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`
      ======================
      [GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}
      ======================
      `)
    )
  if (networkError)
    console.log(`
    ======================
    [Network error]: ${networkError}
    ======================
    `)
})

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
    link: from([errorLink, createContentfulhttpLink(draftMode)]),
    cache: new InMemoryCache(),
  })
}
export default client
