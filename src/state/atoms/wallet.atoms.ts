import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { Currency } from '../../__generated/enums'

// persist explicit wallet disconnection in browser storage
export const disconnectWalletAtom = atomWithStorage('wallet_disc', false)

export const connectWalletAtom = atom(false)

type WalletBalance = {
  currency: Currency
  amount: number
  usdAmount: number
}
export const walletBalanceAtom = atom<WalletBalance | undefined>(undefined)
