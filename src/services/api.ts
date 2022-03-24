import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { GraphQLClient } from 'graphql-request'
// import setupApollo from '../api/graphql-client'
import { ASSETS_TAG } from './tags'

// const apolloClient = setupApollo()

// Previous base query using apollo client
// const graphqlBaseQuery =
//   () =>
//   async ({ body }: { body: DocumentNode }) => {
//     try {
//       const result = await apolloClient.query({
//         query: body
//       })
//       return { data: result.data }
//     } catch (error) {
//       return { error: { status: 500, data: error } }
//     }
//   }

const client = new GraphQLClient(`${process.env.REACT_APP_API_URL}/graphql`)

export const baseAPI = createApi({
  reducerPath: 'api',
  // baseQuery: apolloClient,
  baseQuery: graphqlRequestBaseQuery({
    // url: process.env.REACT_APP_API_URL!  // Can use URL but its using a relative path. Would be better to use graphql-request instead of apollo client for bundle size
    client
  }),
  tagTypes: [ASSETS_TAG],
  endpoints: () => ({})
})
