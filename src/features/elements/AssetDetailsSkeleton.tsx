const AssetDetailsSkeleton = () => {
  return (
    <div className='mx-auto pt-10 pb-24 lg:pt-0 md:px-6 lg:px-0'>
      <div className='grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
        <div className='xs:mb-2 lg:p-6 bg-white-100 flex flex-col'>
          <div className='object-center object-cover rounded-lg w-full h-full border-[#E4ECF7]-600 border-2 min-h-[600px] animate-skeleton' />
        </div>
        <div className='lg:p-6 bg-white-100 flex flex-col'>
          <div className='group w-full rounded-lg overflow-hidden sm:relative sm:aspect-none h-full border-[#E4ECF7]-600 border-2 p-4'>
            <div className='pt-6 px-6 items-end'>
              <div className='mb-3'>
                <div>
                  <span className='inline-block w-1/2 h-9 animate-skeleton' />
                </div>
                <div className='mt-4 mb-2 flex gap-3'>
                  {new Array(3).fill(1).map((_, i) => (
                    <span key={i} className='h-6 w-11 animate-skeleton' />
                  ))}
                </div>
              </div>
              <div className='w-full overflow-hidden h-50 lg:h-66 xl:h-74 mt-8'>
                <div className='flex items-center gap-4'>
                  <div className='w-9 h-9 object-center object-cover rounded-full inline-block animate-skeleton' />
                  <div className='flex flex-col gap-2'>
                    <span className='h-3 w-28 animate-skeleton' />
                    <span className='h-3 w-28 animate-skeleton' />
                  </div>
                </div>
                <div className='mt-4 mb-6 flex flex-col gap-2'>
                  {new Array(4).fill(1).map((__, j) => (
                    <span key={j} className='h-4 w-full animate-skeleton' />
                  ))}
                </div>
                <div className='flex flex-col gap-3'>
                  <div className='h-4 w-3/4 animate-skeleton ' />
                  <div className='flex gap-5'>
                    {new Array(4).fill(1).map((item, i) => (
                      <div key={i} className='flex gap-1'>
                        {new Array(2).fill(1).map((___, k) => (
                          <span
                            key={k}
                            className='h-10 w-8 border rounded-sm'
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className='h-5 w-7' />
                <div className='flex pt-10 justify-between gap-4 overflow-x-visible'>
                  {new Array(2).fill(1).map((____, l) => (
                    <span
                      key={l}
                      className='h-12 rounded-full w-full animate-skeleton '
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetDetailsSkeleton
