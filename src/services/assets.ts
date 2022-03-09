import { Asset, Vland } from '../types'
import { baseAPI } from './api'
import { GET_ASSETS } from './queries'
import { ASSETS_TAG } from './tags'

export const assetApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query<Asset<Vland | any>[], void>({
      query: () => ({
        body: GET_ASSETS
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({
                type: 'ASSETS' as const,
                id
              })),
              { type: ASSETS_TAG, id: 'LIST' }
            ]
          : [{ type: ASSETS_TAG, id: 'LIST' }]
      },
      transformResponse: (result) => {
        return result.assets
      }
    })
  })
})

export const { useGetAssetsQuery } = assetApi
