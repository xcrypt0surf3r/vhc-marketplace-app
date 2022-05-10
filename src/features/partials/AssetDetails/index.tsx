import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import makeBlockie from 'ethereum-blockies-base64'
import currencyIcon from '../../../assets/images/icons/currency.svg'
import BidCountDownTimer from '../../../pages/asset-details/BidCountdownTimer'
import { AssetWithListing, Bid } from '../../../services/queries'
import {
  cancelBuyNowAtom,
  listingAtom,
  ListingExtended
} from '../../../state/atoms/listing.atoms'
import {
  classNames,
  isDateElapsed,
  styleTypology,
  getAssetImage,
  truncate,
  currencyExchange
} from '../../../utils'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import Properties from './Properties'
import AssetPanels from './AssetPanels'
import { useIsOwner } from '../../../hooks'
import AssetDetailsSkeleton from '../../elements/AssetDetailsSkeleton'
import { useModal } from '../../../hooks/use-modal'
import BuyNow from '../modals/BuyNow'
import PlaceBid from '../modals/PlaceBid'
import CancelBuyNow from '../modals/CancelBuyNow'
import { Currency } from '../../../__generated/enums'

const AssetDetails = ({ asset }: { asset: AssetWithListing | undefined }) => {
  const [usdPrice, setUsdPrice] = useState<number>()
  const [, setListing] = useAtom(listingAtom)
  const [listed, setListed] = useState<ListingExtended>()
  const isOwner = useIsOwner(asset?.owner)
  const navigate = useNavigate()
  const [, setCancelBuyNow] = useAtom(cancelBuyNowAtom)
  const { openModal } = useModal()

  useEffect(() => {
    if (asset) {
      setListed({
        ...asset?.activeListing,
        assetName: asset?.assetData.name,
        assetImage: getAssetImage(asset!)
      } as ListingExtended)
    }

    ;(async () => {
      if (asset?.activeListing?.buyNow) {
        setUsdPrice(
          await currencyExchange(asset?.activeListing.buyNow.price.value)
        )
      }
      if (asset?.activeListing?.auction) {
        setUsdPrice(
          await currencyExchange(
            asset?.activeListing.auction?.startingPrice.value
          )
        )
      }
    })()
  }, [asset, setListing])

  const handleClick = () => {
    setListing(listed)
    if (asset?.activeListing?.type === 'BUY_NOW') {
      openModal('Buy Now', <BuyNow />)
    }
    if (asset?.activeListing?.type === 'AUCTION') {
      openModal('Place a bid', <PlaceBid />)
    }
  }

  const handleUnlist = () => {
    setCancelBuyNow(asset?.activeListing)
    openModal('', <CancelBuyNow />)
  }

  const handleSell = () => {
    navigate(`/sell-asset/${asset?.tokenId}`, {
      replace: true
    })
  }

  const Price = ({
    title,
    value,
    currency,
    noUsd
  }: {
    title: string
    value: number
    currency: Currency
    noUsd?: boolean
  }) => (
    <div className='flex flex-col'>
      <span className='text-[#505780] font-xs'>{title}</span>
      <div className='flex items-center gap-3'>
        <img
          src={currencyIcon}
          className='w-6 h-6 object-center object-cover rounded-[.75rem] inline-block skeleton'
        />
        <>
          <span className='font-medium text-xl font-prototype'>
            {value} ${currency}
          </span>
          {!noUsd && (
            <span className='font-thin text-[#505780]font-sm border-l border-l-gray-300 pl-3'>
              ${usdPrice?.toFixed(2)}
            </span>
          )}
        </>
      </div>
    </div>
  )

  const BuyNowPrice = () =>
    asset?.activeListing?.buyNow ? (
      <Price
        title='Price'
        value={asset.activeListing.buyNow.price.value}
        currency={asset.activeListing.buyNow.price.currency}
      />
    ) : null

  const AuctionPrice = () =>
    asset?.activeListing?.auction ? (
      <Price
        title='Starting price'
        value={asset.activeListing.auction?.startingPrice.value}
        currency={asset.activeListing.auction?.startingPrice.currency}
      />
    ) : null

  const HighestBidPrice = () => {
    const bids = asset?.activeListing?.auction?.bids
    if (!asset?.activeListing?.auction || (bids && bids?.length < 1))
      return null

    const highestBid = bids!
      .slice()
      .sort((lowest, highest) => highest.amount.value - lowest.amount.value)[0]
    return highestBid && highestBid.status !== 'CANCELLED' ? (
      <Price
        title='Highest bid price'
        value={highestBid?.amount?.value}
        currency={highestBid?.amount?.currency}
        noUsd
      />
    ) : null
  }

  const SalePrice = () =>
    asset?.activeListing?.type === 'BUY_NOW' ? (
      <BuyNowPrice />
    ) : asset?.activeListing?.type === 'AUCTION' ? (
      <AuctionPrice />
    ) : null

  const PurchaseButton = () => {
    const endDate =
      asset?.activeListing?.auction?.endDate ??
      asset?.activeListing?.buyNow?.endDate

    return asset?.activeListing &&
      asset?.activeListing.isActive &&
      !isDateElapsed(endDate!) ? (
      <Button
        sizer={ButtonSizes.FULL}
        color={ButtonColors.PRIMARY}
        onClick={handleClick}
      >
        {asset?.activeListing?.type === 'BUY_NOW'
          ? 'Buy now'
          : asset?.activeListing?.type === 'AUCTION'
          ? 'Place a bid'
          : ''}
      </Button>
    ) : null
  }

  const ListUnlistButton = () => {
    const endDate =
      asset?.activeListing?.auction?.endDate ??
      asset?.activeListing?.buyNow?.endDate

    if (!asset?.activeListing) {
      return (
        <Button
          sizer={ButtonSizes.FULL}
          color={ButtonColors.PRIMARY}
          onClick={handleSell}
        >
          Sell
        </Button>
      )
    }

    if (asset?.activeListing && !isDateElapsed(endDate!)) {
      return (
        <Button
          sizer={ButtonSizes.FULL}
          color={ButtonColors.PRIMARY}
          onClick={handleUnlist}
        >
          Unlist
        </Button>
      )
    }
    return null
  }

  return (
    <>
      {asset ? (
        <div className='mx-auto pt-10 pb-24 lg:pt-0 md:px-6 lg:px-0'>
          <div className='grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
            <div className='xs:mb-2 lg:p-6 bg-white-100 flex flex-col'>
              <img
                src={getAssetImage(asset)}
                alt={asset.assetData.name}
                className='object-center object-cover rounded-lg w-full h-full min-h-[600px]'
              />
            </div>
            <div className='lg:p-6 bg-white-100 flex flex-col'>
              <div className='group w-full rounded-3xl overflow-hidden sm:relative sm:aspect-none h-full border p-4'>
                <div className='pt-6 px-6 items-end'>
                  <div className='font-normal text-sm tracking-tight mb-3 text-left'>
                    <div>
                      <h2 className='text-3xl font-medium inline-block font-prototype'>
                        {asset.assetData.name}
                      </h2>
                    </div>

                    <div className='mt-4 mb-2 flex gap-3 text-xs'>
                      <span
                        className={classNames(
                          styleTypology(asset.assetData.typology),
                          'px-2 py-1 rounded-md'
                        )}
                      >
                        {asset.assetData.typology}
                      </span>
                      <span className='district px-2 py-1 rounded-md'>
                        {asset.assetData.district}
                      </span>
                      <span className='district px-2 py-1 rounded-md'>
                        {asset.assetData.island}
                      </span>
                    </div>
                  </div>
                  <div className='w-full overflow-hidden h-50 lg:h-66 xl:h-74 mt-8'>
                    <div className='flex items-center gap-4'>
                      <img
                        src={makeBlockie(asset?.owner ?? '')}
                        alt={asset.owner}
                        className='w-9 h-9 object-center object-cover rounded-full inline-block skeleton'
                      />
                      <div className='flex flex-col'>
                        <span className='text-[#505780] text-xs leading-6'>
                          Owner
                        </span>

                        <h3 className='font-medium text-black text-sm'>
                          <a href={`/asset-details/${asset.tokenId}`}>
                            {truncate(asset.owner, 7)}
                          </a>
                        </h3>
                      </div>
                    </div>
                    <p className='font-sm mt-4 mb-6 line-clamp-4 tracking-wide'>
                      {asset.assetData.description}
                    </p>
                    {asset?.activeListing?.type === 'AUCTION' &&
                      asset.activeListing.auction && (
                        <BidCountDownTimer
                          endDate={
                            new Date(asset.activeListing.auction.endDate)
                          }
                        />
                      )}
                    <div className='flex justify-between'>
                      <SalePrice />
                      <HighestBidPrice />
                    </div>

                    <div className='flex pt-10 justify-between gap-4 h-32'>
                      {isOwner ? <ListUnlistButton /> : <PurchaseButton />}
                      <Button
                        sizer={ButtonSizes.FULL}
                        color={ButtonColors.OUTLINE}
                      >
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
            <Properties
              properties={asset.assetData}
              unlistProps={['name', 'description', 'x', 'y']}
              mergeProps={['x', 'y']}
            />
            <AssetPanels
              panels={{
                bids: (asset?.activeListing?.auction?.bids as Bid[]) ?? [],
                salesHistory: [],
                owners: []
              }}
            />
          </div>
        </div>
      ) : (
        <AssetDetailsSkeleton />
      )}
    </>
  )
}

export { AssetDetails }
