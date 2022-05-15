import { classNames } from '../../utils'

export const CardSkeleton = ({ short }: { short: boolean }) => {
  return (
    <div className='rounded-[1.25rem] border-[.0938rem] border-gray-200 xl:p-[.75rem] lg:p-[.5rem] p-[0.25rem]'>
      {/* Card image */}
      <div
        className={classNames(
          'w-full rounded-[.75rem] skeleton',
          short
            ? 'h-[207px] lg:h-[185px] xl:h-[205px]'
            : 'h-[295px] lg:h-[252px] xl:h-[297px]'
        )}
      ></div>
      {/* Card title */}
      <div className='h-4 w-24 my-3 skeleton'></div>
      <div className='border-t-[1px] border-gray-200'></div>
      {/* Card body */}
      <div className='flex justify-between py-[6px] px-2'>
        <p className='p-[10px] rounded-md flex h-4 w-14 skeleton'></p>
        <div className='flex justify-between items-center'>
          <div className='h-5 w-5 mr-1 skeleton rounded-full'></div>
          <div className='h-4 w-24 skeleton'></div>
        </div>
      </div>
      {/* Card footer */}
      <footer className='flex items-center justify-between leading-none my-2 flex-row px-2'>
        <span className='flex items-center'>
          <div className='skeleton rounded-full h-[2rem] w-[2rem] flex'></div>
          <p className='ml-2 h-4 w-24 skeleton'></p>
        </span>
      </footer>
    </div>
  )
}

export const AssetCardSkeleton = ({
  n,
  short
}: {
  n: number
  short: boolean
}) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-8'>
    {Array(n)
      .fill(1)
      .map((_, index) => (
        <CardSkeleton key={index} short={short} />
      ))}
  </div>
)
