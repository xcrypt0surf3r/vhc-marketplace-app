import { useAtom } from 'jotai'
import currencyIcon from '../../../assets/images/icons/currency.svg'
import BidCountDownTimer from '../../../pages/asset-details/BidCountdownTimer'
import { AssetWithListing } from '../../../services/queries'
import { useAppDispatch } from '../../../state'
import { listingAtom } from '../../../state/atoms/listing.atoms'
import { openModal, Popup } from '../../../state/popup.slice'
import { classNames, styleTypology, truncate } from '../../../utils'
import { AssetDetailSkeleton } from '../../elements/AssetDetailSkeleton'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import Properties from './Properties'
import SalesHistory from './SalesHistory'

const AssetDetails = ({ asset }: { asset: AssetWithListing | undefined }) => {
  const dispatch = useAppDispatch()
  const [, setListing] = useAtom(listingAtom)

  const handleClick = () => {
    setListing(asset?.listing)
    if (asset?.listing?.type === 'BUY_NOW') {
      dispatch(openModal(Popup.BUY_NOW))
    }
    if (asset?.listing?.type === 'AUCTION') {
      dispatch(openModal(Popup.PLACE_BID))
    }
  }

  const renderBuyNowPrice = () => (
    <div className='flex flex-col'>
      <span className='text-[#505780] font-xs'>Price</span>
      <div className='flex items-center gap-3'>
        <img
          src={currencyIcon}
          className='w-6 h-6 object-center object-cover rounded-[.75rem] inline-block'
        />
        {asset?.listing?.buyNow && (
          <span className='font-medium text-2xl'>
            {asset.listing.buyNow.price.value} $
            {asset.listing.buyNow.price.currency}
          </span>
        )}
      </div>
    </div>
  )

  const renderAuctionPrice = () => (
    <div className='flex flex-col'>
      <span className='text-[#505780] font-xs'>Price</span>
      <div className='flex items-center gap-3'>
        <img
          src={currencyIcon}
          alt={'4000 $VHC'}
          className='w-6 h-6 object-center object-cover rounded-[.75rem] inline-block'
        />
        <span className='font-medium text-2xl'>4000 $VHC</span>
        <span className='font-thin text-[#505780]font-sm border-l border-l-gray-300 pl-3'>
          $200
        </span>
      </div>
    </div>
  )

  const renderPrice = () => {
    if (!asset?.listing) return null

    if (asset.listing?.type === 'BUY_NOW') {
      return renderBuyNowPrice()
    }
    if (asset?.listing?.type === 'AUCTION') {
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
                src={`https://picsum.photos/id/${asset.tokenId}/600/600`}
                alt={asset.assetData.name}
                className='object-center object-cover rounded-lg w-full h-full'
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
                        {'District I'}
                      </span>
                    </div>
                  </div>
                  <div className='w-full overflow-hidden h-50 lg:h-66 xl:h-74 mt-11'>
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
                          <a href={`/asset/${asset.tokenId}`}>
                            {truncate(asset.owner, 7)}
                          </a>
                        </h3>
                      </div>
                    </div>
                    <p className='font-sm mt-4 mb-6'>
                      {asset.assetData.description}
                    </p>
                    {asset?.listing?.type === 'AUCTION' &&
                      asset.listing.auction && (
                        <BidCountDownTimer
                          startDate={new Date(asset.listing.auction.startDate)}
                          endDate={new Date(asset.listing.auction.endDate)}
                        />
                      )}

                    {renderPrice()}

                    {asset?.listing && asset.listing.status === 'ACTIVE' && (
                      <div className='flex pt-10 justify-between gap-4 overflow-x-visible'>
                        <Button
                          magnify={false}
                          className='rounded-3xl'
                          sizer={ButtonSizes.FULL}
                          color={ButtonColors.PRIMARY}
                          onClick={handleClick}
                        >
                          {asset?.listing?.type === 'BUY_NOW'
                            ? 'Buy now'
                            : asset?.listing?.type === 'AUCTION'
                            ? 'Place a bid'
                            : ''}
                        </Button>
                        <Button
                          magnify={false}
                          className='rounded-3xl'
                          sizer={ButtonSizes.FULL}
                          color={ButtonColors.OUTLINE}
                        >
                          Share
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
            <Properties />
            <SalesHistory
              panels={{
                bids: asset.listing?.auction?.bids ?? [],
                orders: [],
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
