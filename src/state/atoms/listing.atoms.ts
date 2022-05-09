import { atom } from 'jotai'
import { Listing } from '../../services/queries'
import { Currency } from '../../__generated/enums'

export interface ListingExtended extends Listing {
  assetName: string
  assetImage: string
}

export const listingAtom = atom<ListingExtended | undefined>(undefined)

export interface IBuyNow {
  tokenAddress: string
  assetId: string
  currency: Currency
  endDate: Date
  startDate: string
  price: number
  assetName: string
  assetImage: string
}

export const buyNowAtom = atom<IBuyNow | undefined>(undefined)

export const cancelBuyNowAtom = atom<Listing | undefined>(undefined)
