import { CancelBidInput } from '../__generated/inputs'
import { baseAPI } from './api'
import { CANCEL_BID_MUTATION, Listing } from './queries'
import { USER_BIDS_TAG } from './tags'

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
      invalidatesTags: (_, __, { bidId }) => {
        return [{ type: USER_BIDS_TAG, id: bidId }]
      }
    })
  })
})

export const { useCancelBidMutation } = bidApi
