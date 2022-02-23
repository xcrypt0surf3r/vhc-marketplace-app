import { CurrencyDollarIcon, HeartIcon } from '@heroicons/react/outline'

type Props = {
  id: number
  assetName: string
  price: string
  type: string
  fave: number
  url: string
  owner: string
  avatar: string
}

const AssetCard = ({
  id,
  assetName,
  price,
  fave,
  url,
  type,
  owner,
  avatar
}: Props) => {
  return (
    <div
      key={id}
      className='magnify rounded-[1.25rem] border-[.0938rem] border-gray-200 xl:p-[.75rem] lg:p-[.5rem] p-[0.25rem]'
    >
      <div className='w-full overflow-hidden h-50 lg:h-66 xl:h-74'>
        <img
          src={url}
          alt={assetName}
          className='w-full h-[16.5625rem] object-center object-cover skeleton rounded-[.75rem]'
        />
      </div>
      <h3 className='text-md py-2 font-medium text-black border-b-[.0938rem] border-gray-200 text-center lg:text-left'>
        <a href={`/asset/${id}`}>{assetName}</a>
      </h3>
      <div className='text-sm flex justify-center lg:justify-between py-1'>
        <p className={`px-2 rounded-md hidden lg:flex ${type}`}>{type}</p>
        <div className='flex justify-between'>
          <CurrencyDollarIcon className='h-5 w-5 text-gray-400 mr-1' />
          <span className='font-medium'>{price} $VHC</span>
        </div>
      </div>
      <footer className='flex flex-col items-center justify-between leading-none my-2 lg:flex-row'>
        <span className='flex items-center no-underline hover:underline text-black'>
          <img
            alt={owner}
            className='hidden skeleton rounded-full h-[2rem] w-[2rem] lg:flex'
            src={avatar}
          />
          <p className='ml-2 text-sm font-normal'>{owner}</p>
        </span>
        <span className='no-underline text-grey-darker hover:text-red-dark flex'>
          <HeartIcon className='h-4 w-4 text-gray-400 mx-2 hover:text-rose-700' />
          {fave}
        </span>
      </footer>
    </div>
  )
}

export { AssetCard }
