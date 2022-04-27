import { ModelType } from 'graphql-ts-client-api'
import {
  asset$,
  mutation$,
  auction$$,
  bid$$,
  buyNow$$,
  listing$$,
  price$$,
  query$,
  user$$,
  vland$,
  listing$
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
    .startingPrice(price$$)
  )
  .buyNow(
    buyNow$$.price(
      price$$
    )
  )

export const BID_FETCHER = bid$$.amount(price$$)

export const BID_QUERY = query$.asset(asset$.listings(listing$.id))

export const USER_FETCHER = user$$.bids(BID_FETCHER).assets(ASSET_FETCHER)

export const USER_QUERY = query$.user(USER_FETCHER)

export const ASSETS_QUERY = query$.assets(ASSET_FETCHER)

export const ASSET_LIST_FETCHER = ASSET_FETCHER.activeListing(LISTING_FETCHER)

export const ASSET_LISTING_QUERY = query$.asset(ASSET_LIST_FETCHER)

export const CANCEL_BID_MUTATION = mutation$.cancelBid(LISTING_FETCHER)

export const CREATE_BID_MUTATION = mutation$.createBid(LISTING_FETCHER)
//
//
//
export type Asset = ModelType<typeof ASSET_FETCHER>

export type AssetWithListing = ModelType<typeof ASSET_LIST_FETCHER>

export type Listing = ModelType<typeof LISTING_FETCHER>

export type Vland = ModelType<typeof VLAND_FETCHER>

export type User = ModelType<typeof USER_QUERY>

export type Bid = ModelType<typeof BID_FETCHER>
