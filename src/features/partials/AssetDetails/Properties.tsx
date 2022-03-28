import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { properties } from '../../../fake-data/assetDetails'

const Properties = () => {
  return (
    <div className='w-full pt-2'>
      <div className='w-full bg-white rounded-lg border-[#E4ECF7]-600 border-2'>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex justify-between w-full px-4 pb-6 pt-6 text-sm font-medium text-left text-white-900 bg-white-100 hover:bg-white-200 focus:outline-none focus-visible:ring focus-visible:ring-white-500 focus-visible:ring-opacity-75'>
                <span className='font-xs font-normal text-[#505780]'>
                  Properties
                </span>
                <ChevronUpIcon
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-white-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className='px-4 pt-4 pb-4 text-sm text-gray-500 border-[#E4ECF7]-600 border-t-2'>
                {Object.keys(properties).map((index: any) => (
                  <div className='flex flex-row items-center py-2' key={index}>
                    <img
                      src={
                        'https://img.icons8.com/ios-glyphs/30/000000/user--v1.png'
                      }
                      alt={properties[index].owner}
                      className='w-8 h-8 object-center object-cover rounded-[.75rem] inline-block'
                    />
                    <div className='flex flex-col pl-2'>
                      <span className='px-2 font-thin text-[#505780] text-left text-xs'>
                        {'Owner'}
                      </span>
                      <h3 className='pl-2 font-medium text-black text-left text-sm'>
                        {properties[index].owner}
                      </h3>
                    </div>
                  </div>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}

export default Properties
