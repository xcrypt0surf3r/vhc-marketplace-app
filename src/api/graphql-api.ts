import { ApolloClient, InMemoryCache } from '@apollo/client'

const setupApollo = () => {
  const client = new ApolloClient({
    uri: 'https://mkt-server-staging.vaulthill.io//graphql',
    cache: new InMemoryCache()
  })

  return client
}

export default setupApollo
