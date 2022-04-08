import { ModelType } from 'graphql-ts-client-api'
import {
  asset$,
  listing$$,
  query$,
  vland$,
  auction$$,
  bid$$,
  buyNow$$,
  price$$
} from '../__generated/fetchers'

// prettier-ignore
export const VLAND_FETCHER = vland$
  .vlandId
  .name
  .description
  .typology
  .district
  .island
  .x
  .y
  .cluster

// prettier-ignore
export const ASSET_FETCHER = asset$
  .tokenId
  .tokenAddress
  .tokenUri
  .creator
  .owner
  .assetData(VLAND_FETCHER)

// prettier-ignore
export const LISTING_FETCHER = listing$$
  .auction(
    auction$$.bids(
      bid$$
    )
  )
  .buyNow(
    buyNow$$.price(
      price$$
    )
  )

export const ASSETS_QUERY = query$.assets(ASSET_FETCHER)

export const ASSET_LIST_FETCHER = ASSET_FETCHER.activeListing(LISTING_FETCHER)

export const ASSET_LISTING_QUERY = query$.asset(ASSET_LIST_FETCHER)

export type Asset = ModelType<typeof ASSET_FETCHER>

export type AssetWithListing = ModelType<typeof ASSET_LIST_FETCHER>

export type Listing = ModelType<typeof LISTING_FETCHER>

export type Vland = ModelType<typeof VLAND_FETCHER>
