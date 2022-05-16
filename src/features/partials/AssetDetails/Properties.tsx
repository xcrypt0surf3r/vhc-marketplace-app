import { Disclosure } from '@headlessui/react'
import * as _ from 'lodash'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { Vland } from '../../../services/queries'
import { getPropertyImage } from '../../../utils'

const Properties = ({ data }: { data: Vland | any }) => {
  const properties = (({
    vlandId,
    typology,
    district,
    island,
    cluster,
    coordinates
  }) =>
    ({
      vlandId,
      typology,
      district,
      island,
      cluster,
      coordinates
    } as { [key: string]: string | number }))(data)

  const Property = ({ property }: { property: string }) => (
    <div className='p-2 bg-[#F7FAFD] border rounded-lg'>
      <div className='flex gap-3 items-center'>
        <div className='bg-[#E4ECF7] p-2 w-11 h-11 object-center object-cover '>
          <img src={getPropertyImage(property)} alt={property} />
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-sm xl:text-base'>{_.startCase(property)}</span>
          <span className='text-black text-xs xl:text-base'>
            {properties[property]}
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <div className='w-full bg-white rounded-3xl border'>
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className='flex justify-between w-full px-8 pb-6 pt-6 text-sm font-medium text-left text-white-900 bg-white-100 hover:bg-white-200 focus:outline-none focus-visible:ring focus-visible:ring-white-500 focus-visible:ring-opacity-75'>
              <span className='font-xs font-normal text-[#505780]'>
                Properties
              </span>
              <ChevronUpIcon
                className={`${
                  open ? 'transform rotate-180' : ''
                } w-5 h-5 text-white-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className='grid grid-cols-2 lg:grid-cols-3 gap-6 px-2 xl:px-8 py-8 text-sm text-gray-500 border-t'>
              {Object.keys(properties).map((key, index) => {
                return (
                  properties[key] && <Property key={index} property={key} />
                )
              })}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default Properties
