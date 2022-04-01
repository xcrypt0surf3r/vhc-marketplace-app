import { Tab } from '@headlessui/react'
import bulkCoinIcon from '../../../assets/images/icons/bulk-coin.svg'
import currencyIcon from '../../../assets/images/icons/currency.svg'
import { classNames } from '../../../utils'

const SalesHistory = ({ panels }: { panels: any }) => {
  return (
    <div className='lg:p-6'>
      <Tab.Group>
        <Tab.List className='flex space-x-1 bg-white border-blue-500 border-b-3'>
          {Object.keys(panels).map((panel) => (
            <Tab
              key={panel}
              className={({ selected }) =>
                classNames(
                  'px-8 py-2.5 text-sm leading-5 font-medium text-black-700',
                  selected ? 'border-[#8A22F2] border-b' : 'bg-white'
                )
              }
            >
              {panel}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-8'>
          {Object.keys(panels).map((keyName, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'bg-white rounded-lg border-[#E4ECF7]-600 border-2'
              )}
            >
              {panels[keyName]?.length === 0 ? (
                <div className='bg-slate-100 m-2 flex flex-col items-center justify-center h-80'>
                  <img src={bulkCoinIcon} alt={keyName} className='pt-8 px-8' />
                  <span className='pb-8 font-sm text-[#718096]'>
                    No active
                    {keyName.replace(/([A-Z]+)*([A-Z][a-z])/g, '$1 $2')}
                    &nbsp;for this asset
                  </span>
                </div>
              ) : (
                <table className='w-full table-fixed'>
                  <thead className='border-b border-gray-300 p-4'>
                    <tr>
                      <th className='w-11 p-4 font-normal text-left'>#</th>
                      {Object.keys(panels[keyName][0])
                        .slice(1)
                        .map((value, index) => (
                          <th
                            key={index}
                            className={classNames(
                              'capitalize text-gray-600 font-normal text-left pr-4 py-4',
                              value === 'datePurchased' ? '' : ''
                            )}
                          >
                            {value.replace(/([A-Z]+)*([A-Z][a-z])/g, '$1 $2')}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {panels[keyName].map((obj: any, index: number) => (
                      <tr key={index} className='border-b border-gray-300'>
                        <td className='px-4'>{index + 1}</td>
                        <td className='py-6 pr-4'>
                          <div className='flex gap-2 items-center'>
                            <img
                              src={`https://picsum.photos/id/${index}/31/31`}
                              alt={obj.owner}
                              className='w-9 h-9 rounded-full'
                            />
                            <span className='truncate'>{obj.owner}</span>
                          </div>
                        </td>
                        {obj.price && (
                          <td className=''>
                            <div className='flex gap-2 items-center'>
                              <img
                                src={currencyIcon}
                                alt={'currency icon'}
                                className='w-7 h-7 rounded-full'
                              />
                              <span>{obj.price}</span>
                            </div>
                          </td>
                        )}
                        <td>{new Date(obj.createdAt).toUTCString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default SalesHistory
