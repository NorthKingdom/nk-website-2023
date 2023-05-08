const queryContentful = async (_query: string) => {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CTF_SPACE_TOKEN}/environments/${process.env.NEXT_PUBLIC_CTF_ENVIRONMENT}`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.NEXT_PUBLIC_CTF_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: _query,
      }),
    }
  )
    .then((res) => res.json())
    .then((queryData) => {
      return queryData.data
    })
}

export { queryContentful }
