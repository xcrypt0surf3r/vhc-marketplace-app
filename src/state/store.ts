import { configureStore } from '@reduxjs/toolkit'
import { assetReducer } from './assets/assetSlice'

export const store = configureStore({
  reducer: { assetReducer }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
