import { Listbox, Transition } from '@headlessui/react'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/outline'
import { Fragment, useState } from 'react'
import { useAppDispatch } from '../../../state'
import { openModal, Popup } from '../../../state/popup.slice'
import { classNames } from '../../../utils'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import { Modal } from '../../shared/Modal'

const currencyOptions = ['$VHC', '$USD']

const balance = {
  $VHC: '32040',
  $USD: '1700'
} as { [key: string]: string }

const PlaceBid = () => {
  const [picked, setPicked] = useState(currencyOptions[0])
  const [amount, setAmount] = useState(0)

  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    dispatch(openModal(Popup.PAYMENT))
  }

  return (
    <Modal heading='Place a bid' align='center' className='max-w-[34rem]'>
      {/* Input Section */}
      <div className='flex items-center pl-2 pr-5 py-[.3125rem] rounded-xl border border-gray-200'>
        <label htmlFor='search' className='sr-only'>
          Place a bid
        </label>
        <Listbox value={picked} onChange={setPicked}>
          {({ open }) => (
            <div className='relative'>
              <Listbox.Label className='sr-only'>
                Select currency option
              </Listbox.Label>
              <Listbox.Button className='inline-flex items-center p-3 mr-3 border-r border-gray-200 text-black gap-2'>
                <p className='ml-2.5 text-sm'>{picked}</p>
                {open ? (
                  <ChevronUpIcon className='h-4 w-4 text-gray-400' />
                ) : (
                  <ChevronDownIcon className='h-4 w-4 text-gray-400' />
                )}
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options className='absolute z-10 -left-1 mt-2 w-40  shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  {currencyOptions.map((currency, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-purple-600' : 'text-gray-900',
                          'cursor-default select-none relative p-4 text-sm'
                        )
                      }
                      value={currency}
                    >
                      {({ selected, active }) => (
                        <div className='flex flex-col'>
                          <div className='flex justify-between'>
                            <p
                              className={
                                selected ? 'font-semibold' : 'font-normal'
                              }
                            >
                              {currency}
                            </p>
                            {selected ? (
                              <span
                                className={
                                  active ? 'text-white' : 'text-purple-600'
                                }
                              >
                                <CheckIcon
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                />
                              </span>
                            ) : null}
                          </div>
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
        <div className='relative'>
          <input
            type='number'
            min={0}
            id='amount'
            name='amount'
            className='w-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 sm:text-md'
            placeholder='Amount'
            onChange={(e) => setAmount(+e.target.value)}
          />
        </div>
      </div>
      <div className='flex gap-3 text-gray-500 mt-3 mb-6'>
        <span>Balance:</span>
        {balance[picked]} {picked}
      </div>

      {/* Button section */}
      <Button
        disabled={amount <= 0}
        isDisabled={amount <= 0}
        magnify
        color={ButtonColors.PRIMARY}
        sizer={ButtonSizes.FULL}
        className='rounded-xl disabled:opacity-50 disabled:cursor-not-allowed'
        onClick={handleSubmit}
      >
        Confirm bid
      </Button>
    </Modal>
  )
}

export default PlaceBid
