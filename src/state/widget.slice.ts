import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export enum Widget {
  CONNECT_WALLET = 'connectWallet'
}

const widgetSlice = createSlice({
  name: 'widget',
  initialState: {
    open: ''
  },
  reducers: {
    openWidget: (state, { payload }) => {
      state.open = payload
    },
    closeWidget: (state) => {
      state.open = ''
    }
  }
})

export const getWidget = (state: RootState) => state.widget

export const { openWidget, closeWidget } = widgetSlice.actions

export const widgetReducer = widgetSlice.reducer
