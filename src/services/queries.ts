import {
  asset$,
  asset$$,
  listing$$,
  query$,
  vland$
} from '../__generated/fetchers'

// prettier-ignore
export const ASSET_LIST_FETCHER = query$.assets(
  asset$
   .tokenId
   .tokenUri
   .creator
   .owner
   .assetData(
    vland$
      .vlandId
      .name
      .description
      .typology
      .district
      .island
      .x
      .y
      .cluster
  )
)

export const ASSET_FETCHER = asset$$

export const LISTING_FETCHER = listing$$
