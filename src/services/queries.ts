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
  listing$,
  salesHistory$$
} from '../__generated/fetchers'

// prettier-ignore
export const VLAND_FETCHER = vland$
  .vlandId
  .typology
  .district
  .island
  .coordinates
  .cluster

export const BID_FETCHER = bid$$.amount(price$$)

// prettier-ignore
export const LISTING_FETCHER = listing$$
  .auction(
    auction$$.bids(
      BID_FETCHER
    )
    .startingPrice(price$$)
  )
  .buyNow(
    buyNow$$.price(
      price$$
    )
  )

export const SALESHISTORY_FETCHER = salesHistory$$.price(price$$)

// prettier-ignore
export const ASSET_FETCHER = asset$
  .name
  .description
  .tokenId
  .tokenAddress
  .tokenUri
  .creator
  .owner
  .imageUrl
  .animationUrl
  .activeListing(LISTING_FETCHER)
  .assetData(VLAND_FETCHER)
  .salesHistory(SALESHISTORY_FETCHER)

export const BID_QUERY = query$.asset(asset$.listings(listing$.id))

export const USER_FETCHER = user$$.bids(BID_FETCHER).assets(ASSET_FETCHER)

export const USER_QUERY = query$.user(USER_FETCHER)

export const ASSETS_QUERY = query$.assets(ASSET_FETCHER)

export const ASSET_LIST_FETCHER =
  ASSET_FETCHER.activeListing(LISTING_FETCHER).salesHistory(
    SALESHISTORY_FETCHER
  )

export const ASSET_LISTING_QUERY = query$.asset(ASSET_LIST_FETCHER)

export const CANCEL_BID_MUTATION = mutation$.cancelBid(LISTING_FETCHER)

export const CREATE_BID_MUTATION = mutation$.createBid(LISTING_FETCHER)

export const ACCEPT_BID_MUTATION = mutation$.acceptBid(LISTING_FETCHER)
//
//
//
export type Asset = ModelType<typeof ASSET_FETCHER>

export type AssetWithListing = ModelType<typeof ASSET_LIST_FETCHER>

export type Listing = ModelType<typeof LISTING_FETCHER>

export type Vland = ModelType<typeof VLAND_FETCHER>

export type User = ModelType<typeof USER_QUERY>

export type Bid = ModelType<typeof BID_FETCHER>

export type SalesHistory = ModelType<typeof SALESHISTORY_FETCHER>

export type Price = ModelType<typeof price$$>
