import { atom } from 'jotai'
import { Bid } from '../../services/queries'

export const bidAtom = atom<Bid | undefined>(undefined)
