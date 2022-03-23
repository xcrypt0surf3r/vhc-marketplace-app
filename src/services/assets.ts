import { Asset, Vland } from '../types'
import { baseAPI } from './api'
import { GET_ASSETS, GET_ASSET_BY_ID } from './queries'
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
              ...result.map(({ tokenId }) => ({
                type: 'ASSETS' as const,
                tokenId
              })),
              { type: ASSETS_TAG, id: 'LIST' }
            ]
          : [{ type: ASSETS_TAG, id: 'LIST' }]
      },
      transformResponse: (result) => {
        return result.assets
      }
    }),
    getAssetByTokenId: builder.query<Asset<Vland | any>, number>({
      query: (tokenId) => ({
        body: GET_ASSET_BY_ID,
        variables: { tokenId }
      })
    })
  })
})

export const { useGetAssetsQuery, useGetAssetByTokenIdQuery } = assetApi
