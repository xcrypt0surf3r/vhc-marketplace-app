import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export enum Popup {
  CONNECT_WALLET = 'connectWallet',
  CONNECT_WALLET_SCAN = 'connectWalletScan',
  INSTALL_WALLET = 'installWallet',
  WRONG_NETWORK = 'wrongNetwork'
}

const popSlice = createSlice({
  name: 'popup',
  initialState: {
    open: ''
  },
  reducers: {
    openPopup: (state, { payload }) => {
      state.open = payload
    },
    closePopup: (state) => {
      state.open = ''
    }
  }
})

export const getPopup = (state: RootState) => state.popup

export const { openPopup, closePopup } = popSlice.actions

export const popupReducer = popSlice.reducer
