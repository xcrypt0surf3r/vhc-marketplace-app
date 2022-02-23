import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { collections } from '../../../fake-data'
import { CollectionCard } from '../../elements/CollectionCard'

const RecommendedCollections = () => {
  return (
    <div className='bg-white'>
      <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:pt-0'>
        <div className='md:flex md:items-center md:justify-between'>
          <h2 className='text-2xl font-semibold tracking-tight text-gray-900 w-80 border-r-2 border-gray-300'>
            Recommended Collection
          </h2>
          <div className='hidden md:flex items-center justify-between w-[70%]'>
            <a
              href='#'
              className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
            >
              View more<span aria-hidden='true'> &rarr;</span>
            </a>
            <div className='flex gap-2'>
              <a href='#' className='rounded-full h-8 w-8 bg-gray-200'>
                <ChevronLeftIcon className='scale-75 flex text-indigo-700' />
              </a>
              <a href='#' className='rounded-full h-8 w-8  bg-indigo-700'>
                <ChevronRightIcon className='scale-75 flex text-white' />
              </a>
            </div>
          </div>
        </div>

        <div className='mt-6 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 md:gap-y-0 lg:gap-x-8'>
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              id={collection.id}
              projectName={collection.projectName}
              avatar={collection.avatar}
              url={collection.url}
              description={collection.description}
            />
          ))}
        </div>

        <div className='mt-8 text-sm md:hidden'>
          <a
            href='#'
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            View more<span aria-hidden='true'> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export { RecommendedCollections }
