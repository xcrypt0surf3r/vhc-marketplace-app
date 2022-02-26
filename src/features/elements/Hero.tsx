import { SearchIcon } from '@heroicons/react/outline'
import SearchBar from '../shared/header/SearchBar'

const Hero = () => {
  return (
    <div className='bg-white flex flex-col justify-center'>
      <div className='max-w-7xl mx-auto py-5 px-4 sm:px-6 md:py-10 lg:px-8 lg:py-24 lg:pt-0'>
        <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-3 text-center'>
          <span className='block mb-3 md:mb-0 md:inline'>
            {'Inspect, Buy, and Sell'}
          </span>{' '}
          <span className='block md:inline text-blue-500'>Virtual Lands</span>
        </h2>
        <p className='text-center mb-7 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl'>
          {
            "Welcome to the Vault Hill City's one-stop-shop for your land assets"
          }
        </p>
        <div className='md:w-[35rem] sm:w-[25rem] xs:w-[20rem] w-[15rem] mx-auto mb-7 lg:mb-0 relative'>
          <SearchBar />
          <div className='absolute right-3 md:right-4 top-4 ml-4 flex items-center pointer-events-none'>
            <SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
