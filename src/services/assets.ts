import { SignedNftOrderV4 } from '@traderxyz/nft-swap-sdk'
import { Asset, Vland } from '../types'
import { baseAPI } from './api'
import { CREATE_BUY_NOW } from './mutations'
import { GET_ASSETS } from './queries'
import { ASSETS_TAG } from './tags'

export type GetAssetsResponse = {
  assets: Asset[]
}

export const assetApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query<Asset<Vland | any>[], void>({
      query: () => ({
        document: GET_ASSETS
      }),
      providesTags: (response) => {
        return response
          ? [
              ...response.map(({ tokenId }) => ({
                type: 'ASSETS' as const,
                tokenId
              })),
              { type: ASSETS_TAG, id: 'LIST' }
            ]
          : [{ type: ASSETS_TAG, id: 'LIST' }]
      },
      transformResponse: (response: GetAssetsResponse) => {
        return response.assets
      }
    }),
    createBuyNow: builder.mutation<SignedNftOrderV4, SignedNftOrderV4>({
      query: (data: SignedNftOrderV4) => ({
        document: CREATE_BUY_NOW,
        variables: {
          data
        }
      })
    })
  })
})

export const { useGetAssetsQuery, useCreateBuyNowMutation } = assetApi
