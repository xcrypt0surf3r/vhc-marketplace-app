import { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { navList } from '../navigation/navList'
import Hamburger from './Hamburger'
import Logo from './Logo'
import ConnectWallet from './ConnectWallet'

const Header = () => {
  const activeLink = navList[0].text
  const [isClicked, setIsClicked] = useState(activeLink)

  const handleClick = (text: string) => {
    setIsClicked(text)
  }

  return (
    <Disclosure as='nav' className='bg-white mb-8'>
      {({ open }) => {
        return (
          <>
            <div className='mx-2 px-4 sm:px-6 py-5 lg:px-8'>
              <div className='flex justify-between h-16'>
                <div className='flex'>
                  <Logo />
                </div>
                <div className='flex justify-between'>
                  <div className='hidden sm:ml-6 sm:flex sm:items-center gap-4'>
                    <a
                      href='#'
                      className='hidden lg:flex items-center justify-center p-3  text-black md:px-4'
                    >
                      Explore map
                    </a>
                    <a
                      href='#'
                      className='hidden xl:flex items-center justify-center p-3  text-black md:px-4'
                    >
                      VHC Token
                    </a>
                    <div className='flex space-x-3'>
                      <ConnectWallet />
                    </div>
                    <DotsVerticalIcon className='hidden xl:hidden sm:flex pt-2 h-10 w-8' />
                  </div>
                </div>
                <Hamburger open={open} />
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden'>
              <div className='pt-2 pb-10 flex flex-col items-center space-y-1'>
                {navList.map((route) => (
                  <Disclosure.Button
                    as='a'
                    key={route.text}
                    href={route.url}
                    className={`pl-3 pr-4 py-2 border-x-4 text-base font-medium w-full flex justify-center ${
                      isClicked === route.text
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700 block'
                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block '
                    }`}
                    onClick={() => handleClick(route.text)}
                  >
                    {route.text}
                  </Disclosure.Button>
                ))}
                <div className='flex flex-col sm:flex-row gap-2 w-full xs:px-4'>
                  <a
                    href='#'
                    className='magnify w-3/4 py-2 mx-auto border sm:rounded-xl text-center text-black bg-[#E4ECF7] lg:px-4'
                  >
                    VHC Token
                  </a>
                  <a
                    href='#'
                    className='magnify w-3/4 py-2 mx-auto sm:rounded-xl text-center text-white bg-[#4D46BA] lg:px-4'
                  >
                    Explore map
                  </a>
                  <div className='magnify w-3/4 py-2 mx-auto sm:rounded-xl text-center text-white bg-gradient-to-r from-orange-400 via-purple-500 to-blue-500 lg:px-4 cursor-pointer'>
                    Connect Wallet
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )
      }}
    </Disclosure>
  )
}

export default Header
