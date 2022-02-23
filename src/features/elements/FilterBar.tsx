import { useState } from 'react'
import { searchOptions } from '../../fake-data/searchOptions'

const FilterBar = () => {
  const activeLink = searchOptions[0].title
  const [isSelected, setIsSelected] = useState(activeLink)

  const handleClick = (title: string) => {
    setIsSelected(title)
  }
  return (
    <div className='flex justify-center gap-2 overflow-x-scroll sm:gap-5 xl:mb-20 border-b-gray-200 border-t-0 border-[1.2px]'>
      {searchOptions.map((option) => (
        <a
          key={option.title}
          href={option.url}
          className={`inline-flex items-center px-1 pt-1 border-b-2 ${
            isSelected === option.title
              ? 'border-indigo-500 text-gray-900'
              : 'border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-700'
          }`}
          onClick={() => handleClick(option.title)}
        >
          {option.title}
        </a>
      ))}
    </div>
  )
}

export { FilterBar }
