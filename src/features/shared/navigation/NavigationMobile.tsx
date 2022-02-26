import { Disclosure } from '@headlessui/react'
import { useState } from 'react'
import { navList } from './navList'

const NavigationMobile = () => {
  const activeLink = navList[0].text
  const [isSelected, setIsSelected] = useState(activeLink)

  const handleClick = (text: string) => {
    setIsSelected(text)
  }
  return (
    <div className='pt-2 pb-3 space-y-1'>
      {navList.map((route) => (
        <Disclosure.Button
          as='a'
          key={route.text}
          href={route.url}
          className={`pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
            isSelected === route.text
              ? 'bg-indigo-50 border-indigo-500 text-indigo-700 block'
              : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block'
          }`}
          onClick={() => handleClick(route.text)}
        >
          {route.text}
        </Disclosure.Button>
      ))}
    </div>
  )
}

export { NavigationMobile }
