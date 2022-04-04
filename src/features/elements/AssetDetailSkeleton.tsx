export const AssetDetailSkeleton = () => {
  return (
    <div className='bg-white flex flex-col justify-center md:flex'>
      <div className='pt-10 pb-24 lg:pt-0 md:px-3 md:px-6 lg:px-0'>
        <div className='grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
          <div className='xs:mb-2 p-6 bg-white-100 flex flex-col w-full h-full'>
            <div className='w-full lg:h-full h-[25rem] animate-skeleton rounded-[.75rem]'></div>
          </div>
          <div className='p-6 bg-white-100 flex flex-col'>
            <div className='group w-full rounded-lg overflow-hidden sm:relative sm:aspect-none h-full border-[#E4ECF7]-600 border-2 p-4'>
              <div className='w-full lg:h-[30rem] h-[25rem] animate-skeleton rounded-[.75rem]'></div>
            </div>
          </div>
        </div>
        <div className='grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
          <div></div>

          <div className='p-6 bg-white-100 flex flex-col'>
            <div className='w-full h-[5rem] animate-skeleton rounded-[.75rem]'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
