import { truncate } from '../../utils'

type Props = {
  tokenId: number
  tokenUri?: string
  image: string
  name: string
  typology?: string
  owner: string
  avatar: string
  onClick: () => void
}

const AssetCard = ({
  tokenId,
  image,
  owner,
  avatar,
  typology,
  name,
  ...props
}: Props) => {
  let type = ''
  if (typology) {
    type = typology.charAt(0) + typology.toLocaleLowerCase().slice(1)
  }

  return (
    <div
      {...props}
      key={tokenId}
      className='magnify rounded-[1.25rem] border-[.0938rem] border-gray-200 xl:p-[.75rem] lg:p-[.5rem] p-[0.25rem] cursor-pointer'
    >
      {/* Card image */}
      <div className='w-full overflow-hidden h-50 lg:h-66 xl:h-74'>
        <img
          src={image}
          alt={name}
          className='w-full h-[16.5625rem] object-center object-cover animate-skeleton rounded-[.75rem]'
        />
      </div>
      {/* Card title */}
      <h3 className='p-2 font-medium text-black border-b-[.0938rem] border-gray-200 text-left'>
        <a href={`/asset/${tokenId}`}>{name}</a>
      </h3>
      {/* Card body */}
      <div className='flex justify-between py-1 px-2'>
        <p className={`px-2 rounded-md flex ${type}`}>{type}</p>
        {/* {price && (
          <div className='flex justify-between'>
            <CurrencyDollarIcon className='h-5 w-5 text-gray-400 mr-1' />
            <span className='font-medium'>{price} $VHC</span>
          </div>
        )} */}
      </div>
      {/* Card footer */}
      <footer className='flex items-center justify-between leading-none my-2 flex-row px-2'>
        <span className='flex items-center no-underline hover:underline text-black'>
          <img
            alt={owner}
            className='animate-skeleton rounded-full h-[2rem] w-[2rem] flex'
            src={avatar}
          />
          <p className='ml-2 font-normal'>{truncate(owner, 4)}</p>
        </span>
        {/* <span className='no-underline text-grey-darker hover:text-red-dark flex'>
          <HeartIcon className='h-4 w-4 text-gray-400 mx-2 hover:text-rose-700' />
          {fave}
        </span> */}
      </footer>
    </div>
  )
}

export default AssetCard
