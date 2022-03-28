import {
  asset$,
  listing$$,
  query$,
  vland$,
  auction$$,
  bid$$
} from '../__generated/fetchers'

// prettier-ignore
export const ASSET_LIST_FETCHER = query$.assets(
  asset$
   .tokenId
   .tokenAddress
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

// prettier-ignore
export const ASSET_FETCHER = query$.asset(
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
    .listing(
      listing$$
        .auction(
          auction$$.bids(
            bid$$
          )
        )
    )
)

export const LISTING_FETCHER = listing$$
