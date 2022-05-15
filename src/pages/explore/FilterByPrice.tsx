import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/outline'
import { useAtom } from 'jotai'
import { useRef, useState } from 'react'
import { Select, TextInput } from '../../features/shared/Form'
import { PriceFilter, updateFilterAtom } from '../../state/atoms/filter.atom'

const hasFilterChanged = (oldObj: PriceFilter, newObj: PriceFilter) => {
  return +oldObj.from !== +newObj.from || oldObj.to !== newObj.to
}

const FilterByPrice = () => {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>
  const [, updateFilter] = useAtom(updateFilterAtom)

  const defaultPriceFilter = {
    currency: 'VHC',
    from: '0',
    to: '100000000000000000000'
  }

  const [priceFilter, setPriceFilter] = useState<PriceFilter>(
    defaultPriceFilter as PriceFilter
  )

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target
    setPriceFilter({
      ...priceFilter,
      [name]: value
    } as PriceFilter)
  }
  const applyPriceFilter = () => {
    if (
      !priceFilter ||
      !hasFilterChanged(defaultPriceFilter as PriceFilter, priceFilter)
    )
      return
    updateFilter({
      label: 'price',
      value: priceFilter,
      action: 'add'
    })
  }

  const clearPriceFilter = () => {
    setPriceFilter(defaultPriceFilter as PriceFilter)
    updateFilter({
      label: 'price',
      value: null,
      action: 'remove'
    })
    formRef.current.reset()
  }
  return (
    <div className='w-full bg-gray-50 rounded-xl border pt-2'>
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className='flex w-full justify-between py-2 px-5 lg:py-5'>
              <span className='font-xs font-semibold'>Price</span>
              <ChevronUpIcon
                className={`${
                  open ? 'transform rotate-180' : ''
                } w-5 h-5 text-white-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel>
              <div className='space-y-2 lg:space-y-3 px-5 py-2 lg:py-4 border-t'>
                <Select
                  name='currency'
                  className='p-3'
                  optionList={['VHC', 'USD']}
                  onChange={handleChange}
                />
                <form ref={formRef} className='flex gap-3'>
                  <TextInput
                    name='from'
                    type='number'
                    min={0}
                    placeholder='From'
                    className='w-full p-2 border'
                    noFormik
                    onChange={handleChange}
                  />
                  <TextInput
                    name='to'
                    type='number'
                    min={0}
                    placeholder='To'
                    className='w-full p-2 border'
                    noFormik
                    onChange={handleChange}
                  />
                </form>
                <div className='flex gap-3 mt-2'>
                  <button
                    className='px-2 py-1 bg-white rounded-2xl w-full border border-blue-600'
                    onClick={clearPriceFilter}
                  >
                    Clear
                  </button>
                  <button
                    className='px-2 py-1 bg-blue-600 rounded-2xl w-full text-white'
                    onClick={applyPriceFilter}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default FilterByPrice
