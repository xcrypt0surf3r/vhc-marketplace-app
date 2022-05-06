import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../state'
import {
  modal,
  previousModal,
  ModalProps,
  getModal,
  Flow
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
  const modalMemo = useMemo(
    () => (modalState: ModalProps) => dispatch(modal(modalState)),
    [dispatch]
  )
  return {
    openModal: (title: string, children: React.ReactNode, flow?: Flow) =>
      modalMemo({
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
      dispatch(previousModal())
    },
    freezeModal: () => {
      if (targetModal) {
        modalMemo({ ...targetModal, freeze: true })
      }
    },
    unfreezeModal: () => {
      if (targetModal) {
        modalMemo({ ...targetModal, freeze: false })
      }
    }
  }
}
