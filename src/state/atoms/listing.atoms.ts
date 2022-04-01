import { atom } from 'jotai'
import { Listing } from '../../services/queries'

export const listingAtom = atom<Listing | undefined>(undefined)
