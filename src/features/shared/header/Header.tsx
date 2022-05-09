import { Disclosure } from '@headlessui/react'
import { useEffect, useState } from 'react'
import Hamburger from './Hamburger'
import Logo from './Logo'
import ConnectWallet from './ConnectWallet'
import { Button, ButtonColors, ButtonSizes } from '../Button'
import { useAppSelector } from '../../../state'
import { getModal } from '../../../state/modal.slice'

const Header = () => {
  const [sticky, setSticky] = useState('')
  const modal = useAppSelector(getModal)
  useEffect(() => {
    const makeSticky = () => {
      if (window.pageYOffset > 1 && !modal) {
        setSticky(
          'sticky top-0 text-slate-900 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90 backdrop-blur-sm z-30 '
        )
      } else {
        setSticky('')
      }
    }
    makeSticky()
    window.addEventListener('scroll', makeSticky)
    return () => {
      window.removeEventListener('scroll', makeSticky)
    }
  }, [modal])
  return (
    <Disclosure as='nav' className={sticky}>
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
                  </div>
                </div>
                <Hamburger open={open} />
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden'>
              <div className='flex flex-col sm:flex-row gap-5 w-full xs:px-4 items-center border-b border-gray-300 py-20'>
                <Button
                  sizer={ButtonSizes.MEDIUM}
                  color={ButtonColors.SECONDARY}
                >
                  VHC Token
                </Button>
                <Button sizer={ButtonSizes.MEDIUM} color={ButtonColors.OUTLINE}>
                  Explore map
                </Button>
                <ConnectWallet />
              </div>
            </Disclosure.Panel>
          </>
        )
      }}
    </Disclosure>
  )
}

export default Header
