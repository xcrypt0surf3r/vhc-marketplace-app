import { useState } from 'react'
import { navList } from './navList'

const NavigationDefault = () => {
  const activeLink = navList[0].text
  const [isSelected, setIsSelected] = useState(activeLink)

  const handleClick = (text: string) => {
    setIsSelected(text)
  }

  return (
    <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
      {navList.map((route) => (
        <a
          key={route.text}
          href={route.url}
          className={`inline-flex items-center px-1 pt-1 border-b-2 font-medium ${
            isSelected === route.text
              ? 'border-indigo-500 text-gray-900'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
          }`}
          onClick={() => handleClick(route.text)}
        >
          {route.text}
        </a>
      ))}
    </div>
  )
}

export default NavigationDefault
