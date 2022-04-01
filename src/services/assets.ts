import { ModelType } from 'graphql-ts-client-api'
import { mutation$ } from '../__generated/fetchers'
import { CreateBuyNowInput, FillBuyNowInput } from '../__generated/inputs'
import { baseAPI } from './api'
import {
  Asset,
  ASSETS_QUERY,
  Listing,
  LISTING_FETCHER,
  ASSET_LISTING_QUERY,
  AssetWithListing
} from './queries'
import { ASSET_TAG } from './tags'

export const assetApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query<Asset[], void>({
      query: () => ({
        fetcher: ASSETS_QUERY
      }),
      providesTags: (response) => {
        return response
          ? [
              ...response.map(({ tokenId }) => ({
                type: 'ASSET' as const,
                tokenId
              })),
              { type: ASSET_TAG, id: 'LIST' }
            ]
          : [{ type: ASSET_TAG, id: 'LIST' }]
      },
      transformResponse: (response: ModelType<typeof ASSETS_QUERY>) => {
        return response.assets as Asset[]
      }
    }),
    getAssetByTokenId: builder.query<AssetWithListing, { tokenId: number }>({
      query: ({ tokenId }) => ({
        fetcher: ASSET_LISTING_QUERY,
        options: {
          variables: {
            tokenId
          }
        }
      })
    }),
    createBuyNow: builder.mutation<Listing, CreateBuyNowInput>({
      query: (data: CreateBuyNowInput) => ({
        fetcher: mutation$.createBuyNowListing(LISTING_FETCHER),
        options: {
          variables: {
            data
          }
        }
      })
    }),
    fillBuyNow: builder.mutation<Listing, FillBuyNowInput>({
      query: (data: FillBuyNowInput) => ({
        fetcher: mutation$.fillBuyNowListing(LISTING_FETCHER),
        options: {
          variables: {
            data
          }
        }
      })
    })
  })
})

export const {
  useGetAssetsQuery,
  useGetAssetByTokenIdQuery,
  useCreateBuyNowMutation,
  useFillBuyNowMutation
} = assetApi
