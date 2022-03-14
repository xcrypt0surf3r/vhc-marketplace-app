export const CardSkeleton = () => {
  return (
    <div className='rounded-[1.25rem] border-[.0938rem] border-gray-200 xl:p-[.75rem] lg:p-[.5rem] p-[0.25rem]'>
      {/* Card image */}
      <div className='w-full h-50 lg:h-66 xl:h-74'>
        <div className='w-full h-[16.5625rem] animate-skeleton rounded-[.75rem]'></div>
      </div>
      {/* Card title */}
      <div className='h-4 w-24 my-3 animate-skeleton'></div>
      <div className='border-t-[1px] border-gray-200'></div>
      {/* Card body */}
      <div className='flex justify-between py-[6px] px-2'>
        <p className='p-[10px] rounded-md flex h-4 w-14 animate-skeleton'></p>
        <div className='flex justify-between items-center'>
          <div className='h-5 w-5 mr-1 animate-skeleton rounded-full'></div>
          <div className='h-4 w-24 animate-skeleton'></div>
        </div>
      </div>
      {/* Card footer */}
      <footer className='flex items-center justify-between leading-none my-2 flex-row px-2'>
        <span className='flex items-center'>
          <div className='animate-skeleton rounded-full h-[2rem] w-[2rem] flex'></div>
          <p className='ml-2 h-4 w-24 animate-skeleton'></p>
        </span>
      </footer>
    </div>
  )
}

export const AssetCardSkeleton = (n: number) => {
  return Array(n).fill(<CardSkeleton />)
}
