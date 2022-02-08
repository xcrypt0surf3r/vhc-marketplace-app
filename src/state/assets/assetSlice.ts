import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  assets: {}
}

const assetSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    addAssets: (state, { payload }) => {
      state.assets = payload
    }
  }
})

export const { addAssets } = assetSlice.actions

export const assetReducer = assetSlice.reducer
