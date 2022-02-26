import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

const Hamburger = ({ open }: { open: boolean }) => {
  return (
    <div className='-mr-2 flex items-center sm:hidden'>
      {/* Mobile menu button */}
      <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
        <span className='sr-only'>Open main menu</span>
        {open ? (
          <XIcon className='block h-6 w-6' aria-hidden='true' />
        ) : (
          <MenuIcon className='block h-6 w-6' aria-hidden='true' />
        )}
      </Disclosure.Button>
    </div>
  )
}

export default Hamburger
