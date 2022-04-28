import { atom } from 'jotai'
import { Asset, Listing } from '../../services/queries'
import { Currency } from '../../__generated/enums'

export const listingAtom = atom<Listing | undefined>(undefined)

export interface IBuyNow {
  tokenAddress: string
  assetId: string
  currency: Currency
  endDate: Date
  startDate: string
  price: string
}

export const buyNowAtom = atom<IBuyNow | undefined>(undefined)

export const cancelBuyNowAtom = atom<Asset | undefined>(undefined)
