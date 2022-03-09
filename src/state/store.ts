import {
  combineReducers,
  configureStore,
  PreloadedState
} from '@reduxjs/toolkit'
import { baseAPI } from '../services/api'

const rootReducer = combineReducers({
  [baseAPI.reducerPath]: baseAPI.reducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        baseAPI.middleware
      ),
    preloadedState
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
