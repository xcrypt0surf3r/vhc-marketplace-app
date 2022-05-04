import { CancelBidInput, BidInput, AcceptBidInput } from '../__generated/inputs'
import { baseAPI } from './api'
import {
  ACCEPT_BID_MUTATION,
  CANCEL_BID_MUTATION,
  CREATE_BID_MUTATION,
  Listing
} from './queries'
import { BID_TAG } from './tags'

export const bidApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    cancelBid: builder.mutation<Listing, CancelBidInput>({
      query: (data: CancelBidInput) => ({
        fetcher: CANCEL_BID_MUTATION,
        options: {
          variables: {
            data
          }
        }
      }),
      transformResponse: (response: Listing) => {
        return response as Listing
      },
      invalidatesTags: (_, __, { bidId, listingId }) => {
        return [
          { type: BID_TAG, id: `${bidId}_${listingId}` },
          { type: BID_TAG, id: 'LIST' }
        ]
      }
    }),
    createBid: builder.mutation<Listing, BidInput>({
      query: (data: BidInput) => ({
        fetcher: CREATE_BID_MUTATION,
        options: {
          variables: {
            data
          }
        }
      }),
      transformResponse: (response: Listing) => {
        return response as Listing
      },
      invalidatesTags: () => {
        return [{ type: BID_TAG, id: 'LIST' }]
      }
    }),
    acceptBid: builder.mutation<Listing, AcceptBidInput>({
      query: (data: AcceptBidInput) => ({
        fetcher: ACCEPT_BID_MUTATION,
        options: {
          variables: {
            data
          }
        }
      }),
      transformResponse: (response: Listing) => {
        return response as Listing
      },
      invalidatesTags: () => {
        return [{ type: BID_TAG, id: 'LIST' }]
      }
    })
  })
})

export const {
  useCancelBidMutation,
  useCreateBidMutation,
  useAcceptBidMutation
} = bidApi
