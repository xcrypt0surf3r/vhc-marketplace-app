import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { getModal } from '../../state/modal.slice'
import { useAppSelector } from '../../state'
import { useModal } from '../../hooks/use-modal'
import { classNames } from '../../utils'

export const Modal = () => {
  const modal = useAppSelector(getModal)
  const { closeModal, openPreviousModal } = useModal()
  const handleClose = () => {
    if (!modal?.freeze) closeModal()
  }

  return (
    <Transition.Root show={modal?.open ?? false} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        onClose={handleClose}
      >
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>

          {modal?.open && (
            <div className='inline-block bg-white rounded text-left overflow-hidden shadow-xl transition-all my-8 align-middle max-w-5xl min-w-max'>
              <div className='bg-white pb-20 pt-10 px-10 relative rounded-2xl'>
                <div className='flex justify-between mb-8'>
                  <button
                    type='button'
                    className='text-gray-400 hover:text-gray-500'
                    onClick={() => openPreviousModal()}
                  >
                    <span className='sr-only'>Go back</span>
                    <ArrowLeftIcon
                      className={classNames(
                        'h-8 w-8',
                        modal.flow && !modal.freeze
                          ? 'inline-block'
                          : 'invisible'
                      )}
                      aria-hidden='true'
                    />
                  </button>
                  <button
                    type='button'
                    className={classNames(
                      'text-gray-400 hover:text-gray-500',
                      modal.freeze ? 'invisible' : 'inline-block'
                    )}
                    onClick={() => closeModal()}
                  >
                    <span className='sr-only'>Close</span>
                    <XIcon className='h-8 w-8' aria-hidden='true' />
                  </button>
                </div>
                <div className='text-left w-full'>
                  <Dialog.Title
                    as='h2'
                    className='text-2xl text-center font-medium text-gray-900  mb-8'
                  >
                    {modal?.title}
                  </Dialog.Title>
                  <div>
                    <>{modal?.children}</>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </Transition.Root>
  )
}
