import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/outline'
import { useAtom } from 'jotai'
import { CheckBox } from '../../features/shared/Form'
import { updateFilterAtom } from '../../state/atoms/filter.atom'

const FilterByDistrict = () => {
  const [, updateFilter] = useAtom(updateFilterAtom)

  const filterOptions = [
    'community',
    'play',
    'imagination',
    'romance',
    'curiosity',
    'idealism'
  ]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      updateFilter({
        label: 'district',
        value: event.target.value,
        action: 'add'
      })
    } else {
      updateFilter({
        label: 'district',
        value: event.target.value,
        action: 'remove'
      })
    }
  }

  return (
    <div className='w-full bg-gray-50 rounded-xl border pt-2'>
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className='flex w-full justify-between py-2 px-5 lg:py-5'>
              <span className='font-xs font-semibold'>District</span>
              <ChevronUpIcon
                className={`${
                  open ? 'transform rotate-180' : ''
                } w-5 h-5 text-white-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel>
              <fieldset className='lg:space-y-3 px-5 pt-4 pb-4 border-t'>
                <legend className='sr-only'>Filter by District</legend>
                {filterOptions.map((option, index) => (
                  <CheckBox
                    name='district'
                    className='h-5 w-5'
                    key={index}
                    label={option}
                    labelStyle='font-semibold'
                    onChange={(e) => handleChange(e)}
                  />
                ))}
              </fieldset>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default FilterByDistrict
