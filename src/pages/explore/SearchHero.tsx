const SearchHero = ({ total }: { total: number }) => {
  return (
    <div className='bg-white flex flex-col justify-center'>
      <div className='max-w-7xl mx-auto py-5 px-4 sm:px-6 md:py-10 lg:px-8 lg:py-24 lg:pt-0'>
        <h2 className='text-3xl tracking-tight text-gray-900 sm:text-4xl mb-3 text-center'>
          Explore Virtual Lands
        </h2>
        <p className='text-center mb-7 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl'>
          We found {total} result{total > 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}

export default SearchHero
