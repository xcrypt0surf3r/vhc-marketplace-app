import { ModelType } from 'graphql-ts-client-api'
import { Asset, Vland } from '../types'
import { mutation$, query$ } from '../__generated/fetchers'
import { baseAPI } from './api'
import { ASSET_FETCHER, ASSET_LIST_FETCHER, LISTING_FETCHER } from './queries'
import { ASSETS_TAG } from './tags'

export type GetAssetsResponse = {
  assets: Asset[]
}

export type BuyNowInputType = {
  order: string
  assetId: string
  assetAddress: string
}

export type AssetIdInputType = {
  tokenId: number
}

export type AssetType = ModelType<typeof ASSET_FETCHER>

export type ListType = ModelType<typeof LISTING_FETCHER>

export const assetApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query<Asset<Vland | any>[], void>({
      query: () => ({
        fetcher: ASSET_LIST_FETCHER
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
    getAssetByTokenId: builder.query<AssetType, AssetIdInputType>({
      query: ({ tokenId }) => ({
        fetcher: query$.asset(ASSET_FETCHER),
        options: {
          variables: {
            tokenId
          }
        }
      })
    }),
    createBuyNow: builder.mutation<ListType, BuyNowInputType>({
      query: ({ order, assetId, assetAddress }) => ({
        fetcher: mutation$.createBuyNowListing(LISTING_FETCHER),
        options: {
          variables: {
            order,
            assetId,
            assetAddress
          }
        }
      })
    })
  })
})

export const {
  useGetAssetsQuery,
  useGetAssetByTokenIdQuery,
  useCreateBuyNowMutation
} = assetApi
