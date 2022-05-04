import { ModelType } from 'graphql-ts-client-api'
import { mutation$ } from '../__generated/fetchers'
import {
  AuctionInput,
  CancelBuyNowInput,
  CreateBuyNowInput,
  FillBuyNowInput
} from '../__generated/inputs'
import { baseAPI } from './api'
import {
  Asset,
  ASSETS_QUERY,
  Listing,
  LISTING_FETCHER,
  ASSET_LISTING_QUERY,
  AssetWithListing
} from './queries'
import { ASSET_LIST_TAG, ASSET_TAG } from './tags'

export const assetApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query<Asset[], void>({
      query: () => ({
        fetcher: ASSETS_QUERY
      }),
      providesTags: (response) => {
        return response
          ? [
              ...response.map(({ tokenId, tokenAddress }) => ({
                type: 'ASSET_LIST' as const,
                id: `${tokenId}_${tokenAddress}`
              })),
              { type: ASSET_LIST_TAG, id: 'LIST' }
            ]
          : [{ type: ASSET_LIST_TAG, id: 'LIST' }]
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
      }),
      transformResponse: (response: ModelType<typeof ASSET_LISTING_QUERY>) => {
        return response.asset as Asset
      },
      providesTags: (res) => {
        const bids = res?.activeListing?.auction?.bids
        return bids
          ? [
              ...bids.map(({ id, listingId }) => ({
                type: 'BID' as const,
                id: `${id}_${listingId}`
              })),
              { type: 'BID', id: 'LIST' }
            ]
          : res
          ? [{ type: ASSET_TAG, id: `${res.tokenId}_${res.tokenAddress}` }]
          : []
      }
    }),
    createBuyNow: builder.mutation<Listing, CreateBuyNowInput>({
      query: (data: CreateBuyNowInput) => ({
        fetcher: mutation$.createBuyNowListing(LISTING_FETCHER),
        options: {
          variables: {
            data
          }
        }
      }),
      invalidatesTags: (_, __, { assetAddress, assetId }) => {
        return [{ type: ASSET_TAG, id: `${assetId}_${assetAddress}` }]
      }
    }),
    createAuction: builder.mutation<Listing, AuctionInput>({
      query: (data: AuctionInput) => ({
        fetcher: mutation$.createAuction(LISTING_FETCHER),
        options: {
          variables: {
            data
          }
        }
      }),
      invalidatesTags: (_, __, { assetAddress, assetId }) => {
        return [{ type: ASSET_TAG, id: `${assetId}_${assetAddress}` }]
      }
    }),
    cancelBuyNowListing: builder.mutation<Listing, CancelBuyNowInput>({
      query: (data: AuctionInput) => ({
        fetcher: mutation$.cancelBuyNowListing(LISTING_FETCHER),
        options: {
          variables: {
            data
          }
        }
      }),
      invalidatesTags: (_, __, { assetAddress, assetId }) => {
        return [{ type: ASSET_TAG, id: `${assetId}_${assetAddress}` }]
      }
    }),
    fillBuyNow: builder.mutation<Listing, FillBuyNowInput>({
      query: (data: FillBuyNowInput) => ({
        fetcher: mutation$.fillBuyNowListing(LISTING_FETCHER),
        options: {
          variables: {
            data
          }
        }
      }),
      invalidatesTags: (_, __, { assetAddress, assetId }) => {
        return [{ type: ASSET_TAG, id: `${assetId}_${assetAddress}` }]
      }
    })
  })
})

export const {
  useGetAssetsQuery,
  useGetAssetByTokenIdQuery,
  useCreateBuyNowMutation,
  useFillBuyNowMutation,
  useCreateAuctionMutation,
  useCancelBuyNowListingMutation
} = assetApi
