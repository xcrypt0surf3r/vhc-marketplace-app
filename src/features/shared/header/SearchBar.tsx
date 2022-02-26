import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
import { Fragment, useState } from 'react'
import { searchOptions } from '../../../fake-data/searchOptions'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const SearchBar = () => {
  const [selected, setSelected] = useState(searchOptions[0])

  return (
    <div className='flex items-center pl-2 pr-5 py-[.3125rem] border-[.0875rem] rounded-3xl'>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <div className='relative'>
            <Listbox.Label className='sr-only'>
              Select search option
            </Listbox.Label>
            <Listbox.Button className='inline-flex items-center py-2 pl-2 pr-5 border border-transparent  text-black'>
              <p className='ml-2.5 text-sm'>{selected.title}</p>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 -left-1 mt-2 w-40  shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                {searchOptions.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-500' : 'text-gray-900',
                        'cursor-default select-none relative p-4 text-sm'
                      )
                    }
                    value={option}
                  >
                    {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
                    {({ selected, active }) => (
                      <div className='flex flex-col'>
                        <div className='flex justify-between'>
                          <p
                            className={
                              selected ? 'font-semibold' : 'font-normal'
                            }
                          >
                            {option.title}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active ? 'text-white' : 'text-indigo-500'
                              }
                            >
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
      <div className='relative'>
        <input
          id='search'
          name='search'
          className='md:w-[26rem] sm:w-[16.5rem] xs:w-[12rem] w-[7rem] px-3 py-2 leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-md border-l-[1.3px]'
          placeholder='Search'
        />
      </div>
    </div>
  )
}

export default SearchBar
