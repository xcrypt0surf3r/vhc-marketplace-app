import { useNavigate } from 'react-router-dom'
import makeBlockie from 'ethereum-blockies-base64'
import { Asset, Price } from '../../../services/queries'
import AssetCard from '../../elements/AssetCard'

import { AssetCardSkeleton } from '../../elements/AssetCardSkeleton'
import { getAssetPrice } from '../../../utils'

const AssetsListing = ({
  skeletons,
  title,
  assets,
  isLoading,
  short = false
}: {
  skeletons: number
  title?: string
  assets: Asset[]
  isLoading?: boolean
  short?: boolean
}) => {
  const navigate = useNavigate()

  return (
    <div>
      <div className='md:flex md:items-center md:justify-between'>
        <h2 className='text-2xl tracking-tight text-gray-900 w-100'>{title}</h2>
        {/* <div className='hidden md:flex items-center justify-between w-5/6'>
            <a
              href='#'
              className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
            >
              View more<span aria-hidden='true'> &rarr;</span>
            </a>
            <div className='flex gap-2'>
              <a href='#' className='rounded-full h-8 w-8 bg-gray-200'>
                <ChevronLeftIcon className='scale-75 flex text-indigo-700' />
              </a>
              <a href='#' className='rounded-full h-8 w-8  bg-indigo-700'>
                <ChevronRightIcon className='scale-75 flex text-white' />
              </a>
            </div>
          </div> */}
      </div>

      {isLoading ? (
        <AssetCardSkeleton n={skeletons} short={short} />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-8'>
          {assets.map((asset: Asset) => {
            return (
              <AssetCard
                key={asset.tokenId}
                tokenId={asset.tokenId}
                price={getAssetPrice(asset) as Price}
                owner={asset.owner}
                name={asset.name}
                typology={asset.assetData.typology}
                avatar={makeBlockie(asset.owner)}
                image={asset.imageUrl}
                onClick={() =>
                  navigate(`/asset-details/${asset.tokenId}`, {
                    replace: true
                  })
                }
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export { AssetsListing }
