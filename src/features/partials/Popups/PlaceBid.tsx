import { Listbox, Transition } from '@headlessui/react'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/outline'
import { Form, Formik } from 'formik'
import { useAtom } from 'jotai'
import { Fragment, useState } from 'react'
import { useAppDispatch } from '../../../state'
import { openModal, Popup } from '../../../state/popup.slice'
import { walletBalanceAtom } from '../../../state/atoms/wallet.atoms'
import { classNames } from '../../../utils'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import { Modal } from '../../shared/Modal'
import TextInput from '../../shared/TextInput'
import { createBidAtom } from '../../../state/atoms/bid.atom'
import { listingAtom } from '../../../state/atoms/listing.atoms'

// required to fill currency dropdown, will be updated
//  as more currency is supported
enum Currency {
  VHC = 'VHC'
}

const currencyOptions = Object.values(Currency)

const PlaceBid = () => {
  const [picked, setPicked] = useState(currencyOptions[0])
  const [error, setError] = useState<string | undefined>()
  const [walletBalance] = useAtom(walletBalanceAtom)
  const [createBid, setCreateBid] = useAtom(createBidAtom)
  const [listing] = useAtom(listingAtom)

  const dispatch = useAppDispatch()

  const validate = ({ amount }: { amount: number }) => {
    const errors = {} as { amount: string }
    if (!amount || +amount <= 0) {
      errors.amount = 'Amount is required'
    }

    if (walletBalance && walletBalance[picked].value < +amount) {
      errors.amount = 'Insufficient funds'
    }

    return errors
  }

  // PLEASE LEAVE
  // Needed to default input field to highest bid price
  // const getHighestBidPrice = () => {
  //   return (listing?.auction?.bids as Bid[]).sort(
  //     (a, b) => a.amount.value - b.amount.value
  //   )[0].amount.value
  // }

  const handleSubmit = ({ amount }: { amount: number }) => {
    setCreateBid({ value: amount, currency: picked })
    dispatch(openModal(Popup.PAYMENT))
  }

  return (
    <Modal heading='Place a bid' align='center' className='w-[34rem]'>
      <label htmlFor='search' className='sr-only'>
        Place a bid
      </label>

      <Formik
        initialValues={
          {
            amount: createBid.value
              ? createBid?.value
              : listing?.auction?.startingPrice.value
          } as { amount: number }
        }
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className='flex justify-items-center rounded-xl border border-gray-200'>
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
                                active
                                  ? 'text-white bg-blue-500'
                                  : 'text-gray-900',
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
                                        active
                                          ? 'text-white'
                                          : 'text-purple-600'
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
              <TextInput
                noFormik
                setExternalError={setError}
                type='number'
                min={0}
                id='amount'
                name='amount'
                disabled={isSubmitting}
                className='w-full leading-5 py-3 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 sm:text-md'
                placeholder='Amount'
              />
            </div>
            <div className='flex gap-3 text-gray-500 mt-3 mb-6 items-center'>
              <span>Balance:</span>
              {walletBalance
                ? `$${walletBalance[picked].currency} ${walletBalance[picked].value}`
                : 0}
              <span className='text-sm text-red-600 mb-1'>{error ?? ''}</span>
            </div>

            {/* Button section */}
            <Button
              disabled={isSubmitting || !!errors.amount}
              isDisabled={isSubmitting || !!errors.amount}
              magnify
              color={ButtonColors.SECONDARY}
              sizer={ButtonSizes.FULL}
              className='rounded-xl disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Confirm bid
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default PlaceBid
