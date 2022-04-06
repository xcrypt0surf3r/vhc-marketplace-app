import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import {
  cluster,
  district,
  island,
  typology,
  vlandid,
  xycordinate
} from '../../../assets'
import { getVlandImage } from '../../../utils'
import { District, Typology } from '../../../__generated/enums'

type Props = {
  properties: {
    [key: string]: string | number | undefined | District | Typology
  }
  unlistProps?: string[]
}

const Properties = ({ properties, unlistProps }: Props) => {
  const propIcons: string[] = [
    vlandid,
    xycordinate,
    cluster,
    district,
    island,
    typology
  ]
  return (
    <div className='w-full pt-2 lg:p-6'>
      <div className='w-full bg-white rounded-lg border-[#E4ECF7]-600 border-2'>
        <Disclosure>
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
              <Disclosure.Panel className='grid grid-cols-2 gap-6 px-8 py-8 text-sm text-gray-500 border-[#E4ECF7]-600 border-t-2'>
                {Object.keys(properties).map(
                  (propertyKey: string, index: any) => {
                    if (unlistProps?.includes(propertyKey)) {
                      return null
                    }
                    // TODO: remove once the server is sorted
                    const imageName: string = getVlandImage(
                      propIcons,
                      propertyKey,
                      ''
                    )

                    return (
                      <div
                        className='flex flex-row items-center py-1'
                        key={index}
                      >
                        {imageName !== '' ? (
                          <div className='bg-[#E4ECF7] p-2'>
                            <img
                              src={imageName}
                              alt={propertyKey}
                              className='w-8 h-8 object-center object-cover inline-block'
                            />
                          </div>
                        ) : null}

                        <div className='flex flex-col pl-2'>
                          <span className='capitalize p-2 font-medium text-[#505780] text-left text-xs'>
                            <div className=''>
                              {propertyKey.replace(
                                /([A-Z]+)*([A-Z][a-z])/g,
                                '$1 $2'
                              )}
                            </div>
                          </span>
                          <h3 className='pl-2 font-medium text-black text-left text-sm'>
                            <div className=''>{properties[propertyKey]}</div>
                          </h3>
                        </div>
                      </div>
                    )
                  }
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}

export default Properties
