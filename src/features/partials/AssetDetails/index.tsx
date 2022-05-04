import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import currencyIcon from '../../../assets/images/icons/currency.svg'
import BidCountDownTimer from '../../../pages/asset-details/BidCountdownTimer'
import { AssetWithListing, Bid } from '../../../services/queries'
import { useAppDispatch } from '../../../state'
import {
  cancelBuyNowAtom,
  listingAtom
} from '../../../state/atoms/listing.atoms'
import { openModal, Popup } from '../../../state/popup.slice'
import {
  classNames,
  styleTypology,
  getAssetImage,
  truncate,
  currencyExchange
} from '../../../utils'
import { AssetDetailSkeleton } from '../../elements/AssetDetailSkeleton'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import Properties from './Properties'
import AssetPanels from './AssetPanels'

const AssetDetails = ({ asset }: { asset: AssetWithListing | undefined }) => {
  const [usdPrice, setUsdPrice] = useState<number>()
  const dispatch = useAppDispatch()
  const [, setListing] = useAtom(listingAtom)
  const { account } = useWeb3React()
  const navigate = useNavigate()
  const [, setCancelBuyNow] = useAtom(cancelBuyNowAtom)

  useEffect(() => {
    setListing(asset?.activeListing)
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
    setListing(asset?.activeListing)
    if (asset?.activeListing?.type === 'BUY_NOW') {
      dispatch(openModal(Popup.BUY_NOW))
    }
    if (asset?.activeListing?.type === 'AUCTION') {
      dispatch(openModal(Popup.PLACE_BID))
    }
  }

  const handleUnlist = () => {
    setCancelBuyNow(asset)
    dispatch(openModal(Popup.CANCEL_BUY_NOW))
  }

  const handleSell = () => {
    navigate(`/sell-asset/${asset?.tokenId}`, {
      replace: true
    })
  }

  const renderBuyNowPrice = () => (
    <div className='flex flex-col'>
      <span className='text-[#505780] font-xs'>Price</span>
      <div className='flex items-center gap-3'>
        <img
          src={currencyIcon}
          className='w-6 h-6 object-center object-cover rounded-[.75rem] inline-block'
        />
        {asset?.activeListing?.buyNow && (
          <span className='font-medium text-xl font-prototype'>
            {asset.activeListing.buyNow.price.value} $
            {asset.activeListing.buyNow.price.currency}
          </span>
        )}
      </div>
    </div>
  )

  const renderAuctionPrice = () => (
    <div className='flex flex-col pt-2 pb-5'>
      <span className='text-[#505780] font-xs'>Starting Price</span>
      <div className='flex items-center gap-3'>
        <img
          src={currencyIcon}
          alt='Vault Hiill'
          className='w-6 h-6 object-center object-cover rounded-[.75rem] inline-block'
        />
        <span className='font-medium text-2xl font-prototype'>
          {asset?.activeListing?.auction?.startingPrice.value} $
          {asset?.activeListing?.auction?.startingPrice.currency}
        </span>
        <span className='font-thin text-[#505780]font-sm border-l border-l-gray-300 pl-3'>
          ${usdPrice?.toFixed(2)}
        </span>
      </div>
    </div>
  )

  const renderPrice = () => {
    if (!asset?.activeListing) return null

    if (asset.activeListing?.type === 'BUY_NOW') {
      return renderBuyNowPrice()
    }
    if (asset?.activeListing?.type === 'AUCTION') {
      return renderAuctionPrice()
    }
    return null
  }

  return (
    <div className='bg-white flex flex-col justify-center md:flex'>
      {asset ? (
        <div className='mx-auto pt-10 pb-24 lg:pt-0 md:px-6 lg:px-0'>
          <div className='grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
            <div className='xs:mb-2 lg:p-6 bg-white-100 flex flex-col'>
              <img
                src={getAssetImage(asset)}
                alt={asset.assetData.name}
                className='object-center object-cover rounded-lg w-full h-full border-[#E4ECF7]-600 border-2 min-h-[600px]'
              />
            </div>
            <div className='lg:p-6 bg-white-100 flex flex-col'>
              <div className='group w-full rounded-lg overflow-hidden sm:relative sm:aspect-none h-full     border-[#E4ECF7]-600 border-2 p-4'>
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
                        src={'https://picsum.photos/id/1/31/31'}
                        alt={asset.owner}
                        className='w-9 h-9 object-center object-cover rounded-full inline-block animate-skeleton'
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

                    {renderPrice()}

                    <div className='flex pt-10 justify-between gap-4 overflow-x-visible'>
                      {asset.owner === account ? (
                        <Button
                          magnify={false}
                          className='rounded-3xl'
                          sizer={ButtonSizes.FULL}
                          color={ButtonColors.PRIMARY}
                          onClick={
                            asset?.activeListing ? handleUnlist : handleSell
                          }
                        >
                          {asset?.activeListing ? 'Unlist' : 'Sell'}
                        </Button>
                      ) : (
                        asset?.activeListing &&
                        asset.activeListing.status === 'ACTIVE' && (
                          <Button
                            magnify={false}
                            className='rounded-3xl'
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
                        )
                      )}
                      <Button
                        magnify={false}
                        className='rounded-3xl'
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
        <AssetDetailSkeleton />
      )}
    </div>
  )
}

export { AssetDetails }
