import { HttpLink, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  fetch,
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CTF_SPACE_TOKEN}/environments/${process.env.NEXT_PUBLIC_CTF_ENVIRONMENT}`,
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${process.env.NEXT_PUBLIC_CTF_ACCESS_TOKEN}`,
  },
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default client
