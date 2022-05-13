import { Menu } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
import { useAtom } from 'jotai'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CopyLinkIcon } from '../../../assets/images/icons'
import { walletBalanceAtom } from '../../../state/atoms/wallet.atoms'
import { classNames, copyTextToClipboard, truncate } from '../../../utils'
import Tooltip from '../Tooltip'

type Props = {
  account: string
  subMenuItems: MenuItems[]
}

export interface MenuItems {
  name: string
  link?: string
  visible: boolean
  onClick?: (() => void) | (() => Promise<void>)
}

const ProfileMenu = ({ account, subMenuItems }: Props) => {
  const [walletBalance] = useAtom(walletBalanceAtom)
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    copyTextToClipboard(account)
    setCopied(true)
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  return (
    <Menu as='div' className='relative inline-block'>
      <div className='ml-2'>
        <Menu.Button className='p-3.5 inline-flex justify-between items-center rounded-full text-white bg-[#BE9DED]'>
          VH
        </Menu.Button>
      </div>
      <Menu.Items className='absolute p-4 w-[20rem] mt-2 text-left right-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[40]'>
        <Menu.Item disabled>
          <div className='flex justify-between p-3 my-2  hover:bg-gray-50'>
            <h3 className='hover:cursor-auto'>{truncate(account, 6)}</h3>
            {!copied ? (
              <button onClick={copyAddress}>
                <Tooltip show={false} message='copy address' useChild>
                  <CopyLinkIcon color='#8A22F2' size={2} />
                </Tooltip>
              </button>
            ) : (
              <Tooltip show={false} message='address copied!' useChild>
                <CheckIcon className='h-6 w-6 animate-check stroke-green-500' />
              </Tooltip>
            )}
          </div>
        </Menu.Item>

        <Menu.Item>
          <div className='text-white bg-purple-600 w-full py-2 rounded-md pl-4'>
            <span>Wallet balance</span>
            <div className='text-lg pt-2'>
              <span>
                {walletBalance?.VHC.currency} {walletBalance?.VHC.value}
              </span>
              <span className='px-2 text-[#9490D5]'>|</span>
              <span className='text-[#9490D5] pr-2'>
                ${walletBalance?.USD.value.toFixed(2)}
              </span>
            </div>
          </div>
        </Menu.Item>
        <div className='py-2'>
          {subMenuItems.map((item: MenuItems) =>
            item.visible ? (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <Link
                    to={item.link ?? '#'}
                    onClick={item.onClick}
                    className={classNames(
                      active ? 'bg-slate-100' : 'bg-white',
                      'block px-4 py-3 text-sm hover:cursor-pointer'
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ) : null
          )}
        </div>
      </Menu.Items>
    </Menu>
  )
}

export { ProfileMenu }
