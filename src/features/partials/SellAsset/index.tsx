import { Listbox } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import {
  XIcon,
  ChevronDownIcon,
  InformationCircleIcon
} from '@heroicons/react/outline'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { useWeb3React } from '@web3-react/core'
import { AssetWithListing } from '../../../services/queries'
import { classNames, getAssetImage } from '../../../utils'
import { Button, ButtonSizes, ButtonColors } from '../../shared/Button'
import { DatePickerComponent } from '../../shared/DatePicker'
import { openModal, Popup } from '../../../state/popup.slice'
import { useAppDispatch } from '../../../state'
import { Currency } from '../../../__generated/enums'
import { buyNowAtom } from '../../../state/atoms/listing.atoms'
import { AuctionInput } from '../../../__generated/inputs'
import { useCreateAuctionMutation } from '../../../services/assets'

type SaleType = {
  name: string
  description: string
}

export enum BuyNowTypeEnum {
  SELL_NOW = 'Sell Now',
  AUCTION = 'Auction'
}

const SellAsset = ({ asset }: { asset: AssetWithListing | undefined }) => {
  const { account } = useWeb3React()
  const [, setBuyNow] = useAtom(buyNowAtom)
  const [createAuctionMutation] = useCreateAuctionMutation()
  const [errorMessage, setErrorMessage] = useState(false)

  const buyNowTypes: { [key: string]: SaleType } = {
    sellnow: {
      name: BuyNowTypeEnum.SELL_NOW,
      description: 'Sell your asset at a price of your choice'
    },
    auction: {
      name: BuyNowTypeEnum.AUCTION,
      description: 'Sell your asset to the highest bidder'
    }
  }
  const [buyNowType, setSaleType] = useState(BuyNowTypeEnum.SELL_NOW.toString())
  const onSaleTypeClick = (name: string) => {
    setSaleType(name)
  }

  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() + 3600 * 1000 * 24)
  )
  const currencies: Currency[] = ['VHC']
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm()

  const handleCreateAuction = async () => {
    if (asset && account) {
      const data: AuctionInput = {
        assetAddress: asset.tokenAddress,
        assetId: asset.tokenId.toString(),
        startDate: new Date().toUTCString(),
        endDate: selectedDate.toUTCString(),
        makerAddress: account,
        startingPrice: {
          currency: selectedCurrency,
          value: parseFloat(getValues('amount'))
        },
        type: 'ENGLISH'
      }

      try {
        const auctionResponse = await createAuctionMutation(data)
        if (auctionResponse) {
          dispatch(openModal(Popup.SELL_ASSET_SUBMITTED))
        } else {
          setErrorMessage(true)
        }
      } catch (error) {
        setErrorMessage(true)
      }
    }
  }

  const handleSellNow = async () => {
    if (asset) {
      setBuyNow({
        tokenAddress: asset?.tokenAddress,
        assetId: asset?.tokenId.toString(),
        currency: selectedCurrency,
        endDate: selectedDate,
        startDate: new Date().toUTCString(),
        price: getValues('amount')
      })
      dispatch(openModal(Popup.CONFIRM_SELL))
    }
  }

  const onSubmit = () => {
    setIsLoading(true)
    if (asset) {
      switch (buyNowType) {
        case BuyNowTypeEnum.SELL_NOW:
          handleSellNow()
          break
        case BuyNowTypeEnum.AUCTION:
          handleCreateAuction()
          break
        default:
          break
      }
    }
    setIsLoading(false)
  }

  const renderSkeleton = () => {
    return (
      <div className='bg-white flex flex-col justify-center md:flex'>
        <div className='pt-10 pb-24 lg:pt-0 md:px-3 lg:px-0'>
          <div className='grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
            <div className='xs:mb-2 p-6 bg-white-100 flex flex-col w-full h-full'>
              <div className='w-full lg:h-full h-[25rem] animate-skeleton rounded-[.75rem]'></div>
            </div>
            <div className='p-6 bg-white-100 flex flex-col'>
              <div className='flex flex-row justify-between items-center'>
                <h2 className='p-2 text-2xl text-black text-left'>
                  List item for sale
                </h2>
                <XIcon className='h-6 w-6 font-light cursor-pointer hover:text-rose-600' />
              </div>
              <div className='group w-full rounded-lg overflow-hidden sm:relative sm:aspect-none h-full border-[#E4ECF7]-600 border-2 p-4'>
                <div className='w-full lg:h-[30rem] h-[25rem] animate-skeleton rounded-[.75rem]'></div>
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
                className='object-center object-cover rounded-lg w-full h-full min-h-[600px]'
              />
            </div>
            <div className='lg:p-6 bg-white-100 flex flex-col'>
              <h2 className='p-2 text-2xl text-black text-left'>
                List item for sale
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='group w-full rounded-lg overflow-hidden sm:relative sm:aspect-none h-full border-[#E4ECF7]-600 border-2 p-4'>
                  <div className='pt-6 px-6 items-end'>
                    <div className='font-normal text-sm tracking-tight mb-3 text-left'>
                      <label className='text-[#505780] text-sm leading-6'>
                        Choose sale type
                      </label>

                      <div className='grid xs:grid-cols-2 gap-4 my-4'>
                        {Object.keys(buyNowTypes).map(
                          (key: string, index: number) => {
                            return (
                              <div
                                className={classNames(
                                  'flex flex-col p-6 rounded-lg cursor-pointer',
                                  buyNowType === buyNowTypes[key].name
                                    ? 'bg-[#4D7EFF] text-white'
                                    : 'bg-[#EBF2FA] text-black'
                                )}
                                key={index}
                                onClick={() => {
                                  onSaleTypeClick(buyNowTypes[key].name)
                                }}
                              >
                                <div className='font-prototype mb-2 tracking-wide'>
                                  {buyNowTypes[key].name}
                                </div>
                                <div>{buyNowTypes[key].description}</div>
                              </div>
                            )
                          }
                        )}
                      </div>

                      <div className='mt-8 mb-4'>
                        <label className='text-[#505780] text-sm leading-6'>
                          {buyNowType === BuyNowTypeEnum.SELL_NOW
                            ? 'Enter price'
                            : 'Enter starting price'}
                        </label>
                        <div className='flex flex-row'>
                          <div>
                            <Listbox
                              value={selectedCurrency}
                              onChange={setSelectedCurrency}
                            >
                              <Listbox.Button className='border-[#EBF2FA] border-2 rounded-tl-lg rounded-bl-lg w-20'>
                                <div className='flex items-center p-2'>
                                  {selectedCurrency}
                                  <ChevronDownIcon className='ml-2 h-4 w-4 cursor-pointer' />
                                </div>
                              </Listbox.Button>

                              <Listbox.Options className='border-[#EBF2FA] border-2 w-20 absolute z-[40] bg-white cursor-pointer'>
                                {currencies.map((currency: Currency) => (
                                  <Listbox.Option
                                    className='p-2 hover:bg-[#4D7EFF]'
                                    key={currency}
                                    value={currency}
                                  >
                                    {currency}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Listbox>
                          </div>

                          <input
                            type='text'
                            className='border-[#EBF2FA] border-2 rounded-tr-lg rounded-br-lg border-l-0 p-2 flex-1'
                            {...register('amount', {
                              required: true,
                              pattern: /^[+-]?\d*(?:[.,]\d*)?$/
                            })}
                          />
                        </div>
                        {errors.amount && (
                          <p className='text-red-500 text-sm mt-2'>
                            Price is required.
                          </p>
                        )}
                      </div>

                      <div className='mt-8'>
                        <label className='text-[#505780] text-sm leading-6'>
                          End date
                        </label>
                        <div className='flex flex-col'>
                          <DatePickerComponent
                            selected={selectedDate}
                            minDate={selectedDate}
                            popperPlacement='top-end'
                            showPopperArrow={true}
                            className='cursor-pointer w-full z-[40]'
                            {...register('endDate')}
                            onChange={(date: Date) => setSelectedDate(date)}
                          />
                        </div>
                      </div>

                      <div className='flex items-center justify-between mt-8'>
                        <label className='text-[#505780] text-sm leading-6'>
                          Fees
                        </label>
                        <InformationCircleIcon className='h-4 w-4' />
                      </div>

                      <div className='flex items-center justify-between mt-2'>
                        <label className='text-black font-semibold text-sm leading-6'>
                          Service fee
                        </label>
                        <div>2.5%</div>
                      </div>

                      <Button
                        magnify={false}
                        className='rounded-3xl mt-8'
                        sizer={ButtonSizes.FULL}
                        color={ButtonColors.PRIMARY}
                        isLoading={isLoading}
                      >
                        {buyNowType}
                      </Button>
                      {errorMessage ? (
                        <div className='text-red-700 mt-2 text-lg'>
                          Sorry, something went wrong.
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </form>
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
