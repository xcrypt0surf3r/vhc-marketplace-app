import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export type Flow = 'buy_flow' | 'bid_flow'

export interface ModalProps {
  id?: number
  title: string
  children: React.ReactNode
  open?: boolean
  freeze?: boolean
  flow?: Flow
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modals: [] as ModalProps[]
  },
  reducers: {
    modal: (state, { payload }: { payload: ModalProps | undefined }) => {
      if (payload) {
        state.modals.push(payload)
      } else {
        state.modals = []
      }
    },
    previous: (state) => {
      state.modals.pop()
    },
    freeze: (state, { payload }: { payload: ModalProps }) => {
      const index = state.modals.findIndex((modal) => modal.id === payload.id)
      state.modals.splice(index, 1, payload)
    }
  }
})

export const getModal = (state: RootState) => state.modal.modals.at(-1)

export const { modal, previous, freeze } = modalSlice.actions

export const modalReducer = modalSlice.reducer
