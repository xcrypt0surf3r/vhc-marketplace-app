import { ApolloClient, InMemoryCache } from '@apollo/client'

const setupApollo = () => {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL!,
    cache: new InMemoryCache()
  })

  return client
}

export default setupApollo
