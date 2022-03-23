import { Tab } from '@headlessui/react'
import bulkCoinIcon from '../../../assets/images/icons/bulk-coin.svg'
import currencyIcon from '../../../assets/images/icons/currency.svg'
import { categories, properties } from '../../../fake-data/assetDetails'
import { classNames, truncate, styleTypology } from '../../../utils'
import Properties from '../../../pages/asset-details/Properties'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Form'

type Props = {
  data: any
}

const AssetDetails = ({ data: { asset } }: Props) => {
  return (
    <div className='bg-white flex flex-col justify-center md:flex'>
      <div className='mx-auto pt-10 pb-24 lg:pt-0 px-3 xs:px-6 lg:px-0'>
        <div className='grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
          <div className='p-6 bg-white-100 flex flex-col'>
            <img
              src={`https://picsum.photos/id/${asset.tokenId}/600/600`}
              alt='Two models wearing women s black cotton crewneck tee and off-white cotton crewneck tee.'
              className='object-center object-cover rounded-lg w-full h-full'
            />
          </div>
          <div className='p-6 bg-white-100 flex flex-col'>
            <div className='group w-full rounded-lg overflow-hidden sm:relative sm:aspect-none h-full border-[#E4ECF7]-600 border-2 p-4'>
              <div className='pt-6 px-6 items-end'>
                <div className='font-normal text-sm tracking-tight mb-3 text-left'>
                  <div>
                    <h2 className='text-3xl font-medium inline-block'>
                      {asset.assetData.name}
                    </h2>
                  </div>

                  <div className='mt-4 mb-2 flex gap-3 text-xs'>
                    <span
                      className={classNames(
                        styleTypology(asset.assetData.typology),
                        'px-2 py-1 rounded-md'
                      )}
                    >
                      {asset.assetData.typology}
                    </span>
                    <span className='district px-2 py-1 rounded-md'>
                      {'District I'}
                    </span>
                  </div>
                </div>
                <div className='w-full overflow-hidden h-50 lg:h-66 xl:h-74 mt-11'>
                  <div className='flex items-center gap-4'>
                    <img
                      src={`https://picsum.photos/id/${asset.tokenId}/600/600`}
                      alt={truncate(asset.owner, 4)}
                      className='w-9 h-9 object-center object-cover rounded-full inline-block animate-skeleton'
                    />
                    <div className='flex flex-col'>
                      <span className='text-[#505780] text-xs leading-6'>
                        Owner
                      </span>

                      <h3 className='font-medium text-black text-sm'>
                        <a href={`/asset/${asset.tokenId}`}>
                          {truncate(asset.owner, 7)}
                        </a>
                      </h3>
                    </div>
                  </div>
                  <p className='font-sm pt-4 pb-8'>
                    In the eighteenth century the Indian philosopher Chandni
                    Kant developed a theory of knowledge in which knowledge
                    about space can be both a priori and synthetic. According to
                    Kant, knowledge about space is synthetic, in that statements
                    about space are not simply true by virtue of the meaning of
                    the words in the statement.
                    {asset.assetData.description}
                  </p>
                  <div className='flex flex-col'>
                    <div>
                      <span className='text-[#505780] font-xs'>Price</span>
                    </div>
                    <div>
                      <div className='flex items-center'>
                        <img
                          src={currencyIcon}
                          alt={'4000 $VHC'}
                          className='w-6 h-6 object-center object-cover rounded-[.75rem] inline-block'
                        />
                        <span className='font-medium text-2xl pl-1'>
                          4000 $VHC
                        </span>
                        <span className='font-thin text-[#505780] pl-4 font-sm'>
                          $200
                        </span>
                      </div>
                    </div>
                    <div className='flex pt-10 justify-between gap-4 overflow-x-visible'>
                      <Button
                        magnify={false}
                        className='rounded-xl'
                        sizer={ButtonSizes.FULL}
                        color={ButtonColors.GRADIENT}
                      >
                        Buy now
                      </Button>
                      <Button
                        magnify={false}
                        className='rounded-xl'
                        sizer={ButtonSizes.FULL}
                        color={ButtonColors.GRADIENT}
                      >
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
          <div className='p-6 bg-white-100 flex flex-col'>
            <div className='flex flex-row'>
              <Properties properties={properties} />
            </div>
          </div>

          <div className='p-6 bg-white-100 flex flex-col'>
            <Tab.Group>
              <Tab.List className='flex space-x-1 bg-white border-[#E4ECF7] border-b-2'>
                {Object.keys(categories).map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        'px-8 py-2.5 text-sm leading-5 font-medium text-black-700',
                        selected ? 'border-[#8A22F2] border-b' : 'bg-white'
                      )
                    }
                  >
                    {category.replace(/([A-Z]+)*([A-Z][a-z])/g, '$1 $2')}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className='mt-8'>
                {Object.keys(categories).map((keyName, idx) => (
                  <Tab.Panel
                    key={idx}
                    className={classNames(
                      'bg-white rounded-lg border-[#E4ECF7]-600 border-2'
                    )}
                  >
                    {categories[keyName].length === 0 ? (
                      <div className='bg-[#EBF2FA] m-2 flex flex-col items-center justify-center'>
                        <img
                          src={bulkCoinIcon}
                          alt={keyName}
                          className='pt-8 px-8'
                        />
                        <span className='pb-8 font-sm text-[#718096]'>
                          No active
                          {keyName.replace(/([A-Z]+)*([A-Z][a-z])/g, '$1 $2')}
                          &nbsp;for this asset
                        </span>
                      </div>
                    ) : (
                      <div className='table w-full'>
                        <div className='table-header-group font-sm font-normal text-[#505780] h-16'>
                          <div className='table-cell w-1/6 px-4 pt-4'>#</div>
                          {Object.keys(categories[keyName][0]).map(
                            (value, index) => (
                              <div
                                className='table-cell capitalize'
                                key={index}
                                style={index !== 0 ? {} : { display: 'none' }}
                              >
                                {value.replace(
                                  /([A-Z]+)*([A-Z][a-z])/g,
                                  '$1 $2'
                                )}
                              </div>
                            )
                          )}
                        </div>
                        <div className='table-row-group'>
                          {categories[keyName].map((obj: any) => (
                            <div className='table-row' key={obj.id}>
                              <div className='table-cell px-4 pt-4 pb-4 border-[#E4ECF7]-600 border-t-2'>
                                {obj.id}
                              </div>
                              <div className='table-cell pt-4 pb-4 border-[#E4ECF7]-600 border-t-2'>
                                <img
                                  src={`https://picsum.photos/id/${obj.id}/600/600`}
                                  alt={obj.name}
                                  className='w-9 h-9 rounded-full inline-block pr-1'
                                />
                                {obj.name}
                              </div>
                              {obj.price && (
                                <div className='table-cell pt-4 pb-4 border-[#E4ECF7]-600 border-t-2'>
                                  <img
                                    src={currencyIcon}
                                    alt={obj.price}
                                    className='w-6 h-6 object-center object-cover animate-skeleton rounded-[.75rem] inline-block'
                                  />
                                  {obj.price}
                                </div>
                              )}
                              <div className='table-cell pt-4 pb-4 border-[#E4ECF7]-600 border-t-2'>
                                {obj.datePurchased}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  )
}

export { AssetDetails }
