import { capitalize } from 'lodash'
import { Price } from '../../services/queries'
import { truncate } from '../../utils'
import currencyIcon from '../../assets/images/icons/currency.svg'

type Props = {
  tokenId: number
  price?: Price
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
  price,
  image,
  owner,
  avatar,
  typology,
  name,
  ...props
}: Props) => {
  return (
    <div
      {...props}
      key={tokenId}
      className='magnify rounded-[1.25rem] border xl:p-[.75rem] lg:p-[.5rem] p-[0.25rem] cursor-pointer'
    >
      {/* Card image */}
      <div className='w-full overflow-hidden h-50 lg:h-66 xl:h-74'>
        <img
          height={256}
          width={276}
          src={image}
          alt={name}
          className='w-full object-center object-contain rounded-[.75rem] skeleton'
        />
      </div>
      {/* Card title */}
      <h3 className='p-2 font-medium text-black border-b text-left font-prototype'>
        <a href={`/asset/${tokenId}`}>{name}</a>
      </h3>
      {/* Card body */}
      <div className='flex justify-between py-1 px-2'>
        <p className={`px-2 py-0.5 rounded-md text-sm flex ${typology}`}>
          {capitalize(typology)}
        </p>
        {price && (
          <div className='flex justify-between items-center'>
            <img
              src={currencyIcon}
              className='w-5 h-5 object-center object-cover rounded-[.75rem] inline-block skeleton'
            />
            <span className='font-semibold text-sm'>
              {`${price.value} $${price.currency}`}
            </span>
          </div>
        )}
      </div>
      {/* Card footer */}
      <footer className='flex items-center justify-between leading-none my-2 flex-row px-2'>
        <span className='flex items-center no-underline hover:underline text-black'>
          <img
            alt={truncate(owner, 4)}
            className='skeleton rounded-full h-[1.5rem] w-[1.5rem] flex'
            src={avatar}
          />
          <p className='ml-2 text-sm'>{truncate(owner, 4)}</p>
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
