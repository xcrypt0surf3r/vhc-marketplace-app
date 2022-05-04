import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export enum Popup {
  CONNECT_WALLET = 'connectWallet',
  CONNECT_WALLET_SCAN = 'connectWalletScan',
  INSTALL_WALLET = 'installWallet',
  WRONG_NETWORK = 'wrongNetwork',
  BUY_NOW = 'buyNow',
  CHECKOUT = 'checkout',
  PAYMENT = 'payment',
  ORDER_CONFIRMED = 'orderConfirmed',
  BID_SUBMITTED = 'bidSubmitted',
  PLACE_BID = 'placeBid',
  BUY_BID_ERROR = 'buyBidError',
  CANCEL_BID = 'cancelBid',
  CONFIRM_SELL = 'confirmSell',
  SELL_ASSET_SUBMITTED = 'sellAssetSubmitted',
  CANCEL_BUY_NOW = 'cancelBuyNow',
  ACCEPT_OFFER = 'acceptBid'
}

const popSlice = createSlice({
  name: 'popup',
  initialState: {
    modal: [] as string[]
  },
  reducers: {
    openModal: (state, { payload }: { payload: string }) => {
      state.modal.push(payload)
    },
    prevModal: (state) => {
      state.modal.pop()
    },
    closeModal: (state) => {
      state.modal = []
    }
  }
})

export const getPopup = (state: RootState) => state.popup

export const { openModal, closeModal, prevModal } = popSlice.actions

export const popupReducer = popSlice.reducer
