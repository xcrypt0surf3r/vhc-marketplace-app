import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import GraphqlQuery from '../api/graphql-query'

export const getAssets = createAsyncThunk('assets', async () => {
  const response = await GraphqlQuery.getAssets()
  return response.data.assets
})

const landingSlice = createSlice({
  name: 'assets',
  initialState: {
    assets: [] as any[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAssets.fulfilled, (state, { payload }) => {
      state.assets = payload
    })
  }
})

export const landingReducer = landingSlice.reducer
