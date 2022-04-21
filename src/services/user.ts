import { baseAPI } from './api'
import { User, USER_QUERY } from './queries'
import { USER_TAG } from './tags'

export const userApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, { walletAddress: string }>({
      query: ({ walletAddress }) => ({
        fetcher: USER_QUERY,
        options: {
          variables: {
            walletAddress
          }
        }
      }),
      transformResponse: (response: User) => {
        return response as User
      },
      providesTags: (res) => {
        const bids = res?.user?.bids
        return bids
          ? [
              ...bids.map(({ id }) => ({
                type: 'USER_BIDS' as const,
                id
              }))
            ]
          : res
          ? [{ type: USER_TAG, id: res.user?.walletAddress }]
          : []
      }
    })
  })
})

export const { useGetUserQuery } = userApi
