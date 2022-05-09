import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../state'
import {
  modal,
  ModalProps,
  getModal,
  Flow,
  freeze,
  previous
} from '../state/modal.slice'

export const useModal = (): {
  openModal: (title: string, children: React.ReactNode, flow?: Flow) => void
  closeModal: () => void
  openPreviousModal: () => void
  freezeModal: () => void
  unfreezeModal: () => void
} => {
  const dispatch = useAppDispatch()
  const targetModal = useAppSelector(getModal)
  const newModalMemo = useMemo(
    () => (modalState: ModalProps) => dispatch(modal(modalState)),
    [dispatch]
  )
  const oldModalMemo = useMemo(
    () => (modalState: ModalProps) => dispatch(freeze(modalState)),
    [dispatch]
  )
  return {
    openModal: (title: string, children: React.ReactNode, flow?: Flow) =>
      newModalMemo({
        id: Date.now(),
        title,
        children,
        flow,
        open: true
      }),
    closeModal: () => {
      dispatch(modal())
    },
    openPreviousModal: () => {
      dispatch(previous())
    },
    freezeModal: () => {
      if (targetModal) {
        oldModalMemo({ ...targetModal, freeze: true })
      }
    },
    unfreezeModal: () => {
      if (targetModal) {
        oldModalMemo({ ...targetModal, freeze: false })
      }
    }
  }
}
