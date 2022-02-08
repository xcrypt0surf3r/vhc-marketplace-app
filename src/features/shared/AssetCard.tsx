import { HeartIcon } from '@heroicons/react/outline'

const AssetCard = ({
  assetName,
  price,
  fave,
  asset,
  owner,
  avatar
}: IAssetCard) => {
  return (
    <article className='overflow-hidden rounded-[1.25rem] p-[.75rem] border-[.0938rem] border-gray-200 max-w-[18.125rem] h-[25.375rem] hover:shadow-lg'>
      <header>
        <img
          alt={assetName}
          className='skeleton rounded-[.75rem] max-w-[16.625rem] h-[16.5625rem]'
          src={asset}
        />
      </header>

      <title className='flex items-center justify-between leading-tight font-medium py-1 mb-1 border-b-[.0938rem] border-gray-200'>
        <h1 className='text-lg'>
          <div className='no-underline hover:underline text-black'>
            {assetName}
          </div>
        </h1>
      </title>

      <div className='flex items-center justify-between py-1'>
        <p className='text-sm text-gray-500'>Price</p>
        <div className='flex items-center justify-between'>
          <img
            src='https://picsum.photos/21/21/?random'
            alt=''
            className='skeleton rounded-full h-[1.4rem] w-[1.4rem]'
          />
          <span className='ml-2 font-medium'>{price} $VHC</span>
        </div>
      </div>

      <footer className='flex items-center justify-between leading-none mt-2'>
        <span className='flex items-center no-underline hover:underline text-black'>
          <img
            alt={owner}
            className='skeleton rounded-full h-[2rem] w-[2rem]'
            src={avatar}
          />
          <p className='ml-2 text-sm font-normal'>{owner}</p>
        </span>
        <span className='no-underline text-grey-darker hover:text-red-dark flex flex-row'>
          <HeartIcon className='h-5 w-5 text-gray-400 mx-2 hover:text-rose-700' />
          {fave}
        </span>
      </footer>
    </article>
  )
}

export { AssetCard }

interface IAssetCard {
  assetName: string
  price: string
  fave: number
  asset: string
  owner: string
  avatar: string
}
