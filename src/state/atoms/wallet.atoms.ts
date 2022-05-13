import { atom } from 'jotai'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { Currency } from '../../__generated/enums'

export const activatedConnectorAtom = atom<AbstractConnector | undefined>(
  undefined
)

type WalletBalance = {
  [key: string]: {
    currency: Currency | 'USD'
    value: number
  }
}
export const walletBalanceAtom = atom<WalletBalance | undefined>(undefined)
