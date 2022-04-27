import { atom } from 'jotai'
import { Bid } from '../../services/queries'
import { PriceInput } from '../../__generated/inputs'

export const bidAtom = atom<Bid | undefined>(undefined)

export const createBidAtom = atom<PriceInput>({ value: 0, currency: 'VHC' })
