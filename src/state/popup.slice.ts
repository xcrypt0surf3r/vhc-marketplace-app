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
  ORDER_COMPLETE = 'orderComplete'
}

const popSlice = createSlice({
  name: 'popup',
  initialState: {
    modal: ''
  },
  reducers: {
    openModal: (state, { payload }) => {
      state.modal = payload
    },
    closeModal: (state) => {
      state.modal = ''
    }
  }
})

export const getPopup = (state: RootState) => state.popup

export const { openModal, closeModal } = popSlice.actions

export const popupReducer = popSlice.reducer
