import { Listbox, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronDownIcon,
  CheckIcon,
  ChevronUpIcon
} from '@heroicons/react/outline'
import { Fragment, useState } from 'react'
import { useAtom } from 'jotai'
import { useWeb3React } from '@web3-react/core'
import { Form, Formik } from 'formik'
import { AssetWithListing } from '../../../services/queries'
import { classNames, getAssetImage } from '../../../utils'
import { Button, ButtonSizes, ButtonColors } from '../../shared/Button'
import { Calendar } from '../../shared/DatePicker'
import { Currency as CurrencyType } from '../../../__generated/enums'
import { buyNowAtom } from '../../../state/atoms/listing.atoms'
import { AuctionInput } from '../../../__generated/inputs'
import { useCreateAuctionMutation } from '../../../services/assets'
import { TextInput, TextLabel } from '../../shared/Form'
import { ErrorHandler, ErrorProps, Exception } from '../../shared/ErrorHandler'
import { useModal } from '../../../hooks/use-modal'
import SellAssetSubmitted from '../modals/SellAssetSubmitted'
import ConfirmSell from '../modals/ConfirmSell'

export enum Sale {
  SELL = 'Sell',
  AUCTION = 'Auction'
}

const SellAsset = ({ asset }: { asset: AssetWithListing | undefined }) => {
  const { account } = useWeb3React()
  const [, setBuyNow] = useAtom(buyNowAtom)
  const [createAuctionMutation, { error: mutationError, isLoading }] =
    useCreateAuctionMutation()
  const [sale, setSale] = useState<string>(Sale.SELL)
  const [error, setError] = useState<string | undefined>()
  const [reportError, setReportError] = useState({
    visible: false,
    message: ''
  } as ErrorProps)
  const { openModal } = useModal()
  const navigate = useNavigate()

  const saleOptions: {
    [key: string]: {
      name: string
      description: string
    }
  } = {
    sellnow: {
      name: Sale.SELL,
      description: 'Sell your asset at a price of your choice'
    },
    auction: {
      name: Sale.AUCTION,
      description: 'Sell your asset to the highest bidder'
    }
  }
  enum Currency {
    VHC = 'VHC'
  }

  const currencyOptions: CurrencyType[] = Object.values(Currency)

  const [picked, setPicked] = useState(currencyOptions[0])

  const validate = ({ price, endDate }: { price: number; endDate: Date }) => {
    const errors = {} as { price: string; endDate: string }
    if (price.toString().split('.')[1]?.length > 3) {
      errors.price = 'Max. three decimals'
    }

    if (!price || price <= 0) {
      errors.price = 'Price is required'
    }

    if (!endDate) {
      errors.endDate = 'End date is required'
    }

    return errors
  }

  const handleCreateAuction = async (price: number, endDate: Date) => {
    if (asset && account) {
      const data: AuctionInput = {
        assetAddress: asset.tokenAddress,
        assetId: asset.tokenId.toString(),
        startDate: new Date().toUTCString(),
        endDate: endDate.toUTCString(),
        makerAddress: account,
        startingPrice: {
          currency: picked,
          value: price
        },
        type: 'ENGLISH'
      }

      try {
        await createAuctionMutation(data)

        if (mutationError) throw Error(JSON.stringify(mutationError))

        openModal('', <SellAssetSubmitted />)
        navigate(`/asset-details/${asset.tokenId}`, {
          replace: true
        })
      } catch (exception) {
        const exceptionObj = exception as Exception
        setReportError({
          visible: true,
          message: exceptionObj.message
        })
      }
    }
  }

  const handleSellNow = async (price: number, endDate: Date) => {
    if (asset) {
      setBuyNow({
        tokenAddress: asset?.tokenAddress,
        assetId: asset?.tokenId.toString(),
        currency: picked,
        endDate,
        startDate: new Date().toUTCString(),
        price,
        assetName: asset?.assetData.name,
        assetImage: getAssetImage(asset)
      })
      openModal('Confirm sell', <ConfirmSell />)
    }
  }

  const handleSubmit = ({
    price,
    endDate
  }: {
    price: number
    endDate: Date
  }) => {
    if (asset) {
      switch (sale) {
        case Sale.SELL:
          handleSellNow(price, endDate)
          break
        case Sale.AUCTION:
          handleCreateAuction(price, endDate)
          break
        default:
          break
      }
    }
  }

  const renderSkeleton = () => {
    return (
      <div className='bg-white flex flex-col justify-center md:flex'>
        <div className='pt-10 pb-24 lg:pt-0 md:px-3 lg:px-0'>
          <div className='grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
            <div className='xs:mb-2 p-6 bg-white-100 flex flex-col w-full h-full'>
              <div className='w-full lg:h-full h-[25rem] skeleton rounded-[.75rem]'></div>
            </div>
            <div className='p-6 bg-white-100 flex flex-col'>
              <div className='flex justify-between items-center'></div>
              <div className='group w-full rounded-lg overflow-hidden sm:relative sm:aspect-none h-full border-[#E4ECF7]-600 border-2 p-4'>
                <div className='w-full lg:h-[30rem] h-[25rem] skeleton rounded-[.75rem]'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white flex flex-col justify-center md:flex'>
      {asset ? (
        <div className='mx-auto pt-10 pb-24 lg:pt-0 md:px-6 lg:px-0'>
          <div className='grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
            <div className='xs:mb-2 lg:p-6 bg-white-100 flex flex-col'>
              <img
                src={getAssetImage(asset)}
                alt={asset?.assetData.name}
                className='object-center object-cover rounded-lg w-full h-full min-h-[600px] skeleton'
              />
            </div>
            <div className='lg:p-6 bg-white-100 flex flex-col'>
              <h2 className='text-3xl mb-2'>List item for sale</h2>
              <Formik
                initialValues={
                  {
                    price: '' as unknown,
                    endDate: '' as unknown
                  } as {
                    price: number
                    endDate: Date
                  }
                }
                validate={validate}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className='text-gray-700 group w-full rounded-lg sm:relative sm:aspect-none h-full border p-4'>
                      <div className='pt-6 px-6 items-end'>
                        <TextLabel>Choose sale type</TextLabel>

                        <div className='grid xs:grid-cols-2 gap-4'>
                          {Object.keys(saleOptions).map(
                            (key: string, index: number) => {
                              return (
                                <div
                                  className={classNames(
                                    'flex flex-col p-6 rounded-lg cursor-pointer',
                                    sale === saleOptions[key].name
                                      ? 'bg-blue-500 text-blue-50'
                                      : 'bg-blue-50 text-gray-700'
                                  )}
                                  key={index}
                                  onClick={() => setSale(saleOptions[key].name)}
                                >
                                  <h2 className='text-xl mb-2 tracking-wide'>
                                    {saleOptions[key].name}
                                  </h2>
                                  <div>{saleOptions[key].description}</div>
                                </div>
                              )
                            }
                          )}
                        </div>

                        <div className='mt-8 mb-4'>
                          <TextLabel>
                            {sale === Sale.SELL
                              ? 'Enter price'
                              : 'Enter starting price'}
                          </TextLabel>
                          <div className='flex rounded-xl border items-center'>
                            <Listbox value={picked} onChange={setPicked}>
                              {({ open }) => (
                                <div className='relative'>
                                  <Listbox.Button className='inline-flex items-center p-3 border-r text-black gap-2'>
                                    <p className='ml-2.5 '>{picked}</p>
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
                                      {currencyOptions.map(
                                        (currency, index) => (
                                          <Listbox.Option
                                            key={index}
                                            className={({ active }) =>
                                              classNames(
                                                active
                                                  ? 'text-white bg-blue-500'
                                                  : 'text-gray-900',
                                                'cursor-default select-none relative p-2 '
                                              )
                                            }
                                            value={currency}
                                          >
                                            {({ selected, active }) => (
                                              <div className='flex flex-col'>
                                                <div className='flex justify-between'>
                                                  <p
                                                    className={
                                                      selected
                                                        ? 'font-semibold'
                                                        : 'font-normal'
                                                    }
                                                  >
                                                    {currency}
                                                  </p>
                                                  {selected ? (
                                                    <span
                                                      className={
                                                        active
                                                          ? 'text-white'
                                                          : 'text-blue-500'
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
                                        )
                                      )}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              )}
                            </Listbox>
                            <TextInput
                              noFormik
                              setExternalError={setError}
                              type='number'
                              step='any'
                              min={0}
                              id='price'
                              name='price'
                              disabled={sale === Sale.AUCTION && isLoading}
                              className='w-full h-full leading-5 px-3 py-2.5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 sm:text-md'
                              placeholder='Amount'
                            />
                          </div>
                          <span className='block h-2 text-red-600 mb-1 text-sm'>
                            {error}
                          </span>
                        </div>

                        <div className='mt-8'>
                          <TextLabel>End date</TextLabel>
                          <Calendar
                            className='placeholder-gray-400 focus:outline-none focus:placeholder-gray-300'
                            showPopperArrow={false}
                            minDate={new Date(Date.now() + 3600 * 1000 * 24)}
                            name='endDate'
                            placeholderText='mm/dd/yyyy'
                          />
                        </div>

                        <div className='flex items-center justify-between mt-8'>
                          <TextLabel>Fees</TextLabel>
                        </div>

                        <div className='flex items-center justify-between font-semibold'>
                          <span>Service fee</span>
                          <span>2.5%</span>
                        </div>

                        <Button
                          className='mt-8'
                          sizer={ButtonSizes.FULL}
                          color={ButtonColors.PRIMARY}
                          isDisabled={
                            (sale === Sale.AUCTION && isSubmitting) || isLoading
                          }
                        >
                          {sale}
                        </Button>
                        <ErrorHandler
                          visible={reportError.visible}
                          message={reportError.message}
                        />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      ) : (
        renderSkeleton()
      )}
    </div>
  )
}

export { SellAsset }
