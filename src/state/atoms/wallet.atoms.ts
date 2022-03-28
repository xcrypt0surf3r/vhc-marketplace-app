import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// persist explicit wallet disconnection in browser storage
export const disconnectWalletAtom = atomWithStorage('wallet_disc', false)

export const connectWalletAtom = atom(false)
