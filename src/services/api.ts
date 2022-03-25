import { createApi } from '@reduxjs/toolkit/query/react'

import { Fetcher } from 'graphql-ts-client-api'
import { execute, setGraphQLExecutor } from '../__generated'
import { ASSETS_TAG } from './tags'

const graphqlTSBaseQuery = ({ baseUrl }: { baseUrl: string }) => {
  setGraphQLExecutor(async (request, variables) => {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: request,
        variables
      })
    })
    return response.json()
  })

  return async ({
    fetcher,
    options
  }: {
    fetcher: Fetcher<'Query' | 'Mutation', object, object>
    options?: {
      readonly operationName?: string
      readonly variables?: object
    }
  }) => {
    const data = await execute(fetcher, options)
    return { data }
  }
}

export const baseAPI = createApi({
  reducerPath: 'api',
  baseQuery: graphqlTSBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL!
  }),
  tagTypes: [ASSETS_TAG],
  endpoints: () => ({})
})
