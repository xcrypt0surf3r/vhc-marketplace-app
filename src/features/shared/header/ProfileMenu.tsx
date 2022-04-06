import { Menu } from '@headlessui/react'
import { useAtom } from 'jotai'
import { walletBalanceAtom } from '../../../state/atoms/wallet.atoms'
import { truncate } from '../../../utils'

type Props = {
  account: string
  subMenuItems: MenuItems[]
}

export interface MenuItems {
  name: string
  visible: boolean
  onClick?: Function
}

const ProfileMenu = ({ account, subMenuItems }: Props) => {
  const [walletBalance] = useAtom(walletBalanceAtom)

  return (
    <Menu as='div' className='relative inline-block'>
      <div className='ml-2'>
        <Menu.Button className='py-3 px-3 md:px-4 inline-flex rounded-full w-full text-white bg-purple-600'>
          VH
        </Menu.Button>
      </div>
      <Menu.Items className='absolute shadow p-4 w-[17rem] mt-2 text-left right-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
        <Menu.Item>
          <div className='text-[#16192C] w-full py-2 rounded-md mb-2 bg-white'>
            <a>{truncate(account, 6)}</a>
          </div>
        </Menu.Item>

        <Menu.Item>
          <div className='text-white bg-purple-600 w-full py-2 rounded-md pl-4'>
            <span>Wallet balance</span>
            <div className='text-lg pt-2'>
              <span>
                {walletBalance?.amount} {walletBalance?.currency}
              </span>
              <span className='px-2 text-[#9490D5]'>|</span>
              <span className='text-[#9490D5]'>
                ${walletBalance?.usdAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </Menu.Item>
        {subMenuItems.map((item: MenuItems) =>
          item.visible ? (
            <Menu.Item
              key={item.name}
              onClick={() => (item.onClick ? item.onClick() : undefined)}
            >
              {({ active }) => (
                <div
                  className={`text-black w-full py-2 rounded-md pl-4 mt-2 ${
                    active ? 'bg-[#EBF2FA] ' : 'bg-white'
                  }`}
                >
                  <a>{item.name}</a>
                </div>
              )}
            </Menu.Item>
          ) : null
        )}
      </Menu.Items>
    </Menu>
  )
}

export { ProfileMenu }
