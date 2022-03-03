import { configureStore } from '@reduxjs/toolkit'
import { landingReducer } from './landingSlice'

const store = configureStore({
  reducer: { landing: landingReducer }
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
