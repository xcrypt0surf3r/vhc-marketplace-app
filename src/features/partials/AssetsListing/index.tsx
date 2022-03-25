import { useNavigate } from 'react-router-dom'
import { Asset, Vland } from '../../../types'
import AssetCard from '../../elements/AssetCard'
import {
  AssetCardSkeleton,
  CardSkeleton
} from '../../elements/AssetCardSkeleton'

const AssetsListing = ({
  skeleton,
  title,
  assets
}: {
  skeleton: number
  title: string
  assets: Asset<Vland>[]
}) => {
  const navigate = useNavigate()

  return (
    <div className='bg-white'>
      <div className='mx-auto pt-10 pb-24 lg:pt-0 px-3 xs:px-6 lg:px-0'>
        <div className='md:flex md:items-center md:justify-between'>
          <h2 className='text-2xl font-semibold tracking-tight text-gray-900 w-100'>
            {title}
          </h2>
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

        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-8'>
          {assets.length < 1
            ? AssetCardSkeleton(skeleton).map((x, i) => (
                <CardSkeleton key={i} />
              ))
            : assets.map((asset: Asset<Vland>, j) => {
                return (
                  <AssetCard
                    key={asset.tokenId}
                    tokenId={asset.tokenId}
                    owner={asset.owner}
                    name={asset.assetData.name}
                    typology={asset.assetData.typology}
                    avatar={`https://picsum.photos/id/${j}/31/31`}
                    image={`https://picsum.photos/id/${50 + j}/600/600`}
                    onClick={() =>
                      navigate(`/details/${asset.tokenId}`, { replace: true })
                    }
                  />
                )
              })}
        </div>

        {/* <div className='mt-8 text-sm md:hidden'>
          <a
            href='#'
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            View more<span aria-hidden='true'> &rarr;</span>
          </a>
        </div> */}
      </div>
    </div>
  )
}

export { AssetsListing }