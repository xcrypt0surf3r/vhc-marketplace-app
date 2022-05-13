import { atom, Getter, Setter } from 'jotai'
import { bidAtom } from './bid.atom'
import { buyNowAtom, cancelBuyNowAtom, listingAtom } from './listing.atoms'
import { walletBalanceAtom } from './wallet.atoms'

export const clearAllAtom = atom(null, (get: Getter, set: Setter) => {
  set(bidAtom, undefined)
  set(listingAtom, undefined)
  set(buyNowAtom, undefined)
  set(cancelBuyNowAtom, undefined)
  set(walletBalanceAtom, undefined)
})
