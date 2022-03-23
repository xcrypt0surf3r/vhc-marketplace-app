import { createApi } from '@reduxjs/toolkit/query/react'
import { DocumentNode } from 'graphql'
import setupApollo from '../api/graphql-client'
import { ASSETS_TAG } from './tags'

const apolloClient = setupApollo()

const graphqlBaseQuery =
  () =>
  async ({ body, variables }: { body: DocumentNode; variables?: any }) => {
    try {
      const result = await apolloClient.query({
        query: body,
        variables
      })
      return { data: result.data }
    } catch (error) {
      return { error: { status: 500, data: error } }
    }
  }

export const baseAPI = createApi({
  reducerPath: 'api',
  baseQuery: graphqlBaseQuery(),
  tagTypes: [ASSETS_TAG],
  endpoints: () => ({})
})
