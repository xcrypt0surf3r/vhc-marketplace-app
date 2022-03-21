import * as _ from 'lodash'
import {
  InstagramIcon,
  TelegramIcon,
  TwitterIcon
} from '../../assets/images/icons'
import Logo from './header/Logo'

interface NavigationProperties {
  name: string
  href: string
}
interface Navigation {
  [key: string]: NavigationProperties[]
}

const navigation: Navigation = {
  community: [
    { name: 'Vision', href: 'https://vaulthill.io/about' },
    { name: 'Team', href: 'https://vaulthill.io/team' },
    {
      name: 'Careers',
      href: 'https://www.linkedin.com/company/vaulthill/jobs/'
    },
    { name: 'Press', href: 'https://vaulthill.io/about/#press-section' },
    { name: 'Contact us', href: 'https://vaulthill.io/contact-us' }
  ],
  products: [
    { name: 'Vault Hill City', href: 'https://vaulthill.io/product' },
    { name: 'VHC token', href: 'https://vaulthill.io/vhc' },
    { name: 'Avatars', href: 'https://vaulthill.io/' },
    { name: 'Marketplace', href: 'https://vaulthill.io/' },
    { name: 'XR consulting', href: 'https://vaulthill.io/product/#grid' }
  ],
  resources: [
    {
      name: 'White paper',
      href: 'https://vaulthill.io/Documents/VHWhitePaper.pdf'
    },
    { name: 'Blog', href: 'https://blog.vaulthill.io/' },
    { name: 'Audit', href: 'https://vaulthill.io/Documents/HackenAuditVH.pdf' },
    {
      name: 'Brand Asset',
      href: 'https://vaulthill.io/Documents/VHCBrandAssetsGuideLine.pdf'
    }
  ]
}

const footerLinks: NavigationProperties[] = [
  { name: 'Language', href: '#' },
  { name: 'Home', href: '#' },
  {
    name: 'Privacy Policy',
    href: 'https://vaulthill.io/Documents/VHWebsitePrivacyPolicy.pdf'
  },
  { name: 'Terms of Use', href: 'https://vaulthill.io/Documents/VHT&Cs.pdf' },
  { name: 'Product', href: 'https://vaulthill.io/product' },
  {
    name: 'Whitepaper',
    href: 'https://vaulthill.io/Documents/VHWhitePaper.pdf'
  },
  { name: 'Community', href: '#' }
]

const Footer = () => {
  return (
    <footer className='bg-white' aria-labelledby='footer-heading'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className='px-4 sm:px-6 lg:px-[6.5rem] py-12 lg:py-16'>
        <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
          <div className='space-y-8 xl:col-span-1'>
            <Logo />
            <p className='text-gray-500 text-base'>
              An extended reality Blockchain-based metaverse,
              <br />
              designed to make you feel more human
            </p>
          </div>
          <div className='mt-12 grid grid-cols-3 gap-8 xl:mt-0 xl:col-span-2'>
            {Object.keys(navigation).map((keyValue: string) => (
              <div className='mt-12 md:mt-0' key={keyValue}>
                <h3 className='text-sm font-bold text-black tracking-wider capitalize'>
                  {_.upperFirst(keyValue)}
                </h3>
                <ul role='list' className='mt-4 space-y-4'>
                  {navigation[keyValue].map((item: NavigationProperties) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className='text-base text-gray-500 hover:text-gray-900'
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className='flex w-full lg:justify-end'>
          <div className='flex flex-col lg:flex-row w-3/4 mt-12 pt-10'>
            {footerLinks.map((item: NavigationProperties) => (
              <a
                key={item.name}
                href={item.href}
                className='text-base text-[#999999] lg:w-1/4 xs:h-10'
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className='flex lg:w-1/4 lg:flex-col'>
            <div className='flex justify-end space-x-6 mt-12 pt-10'>
              <a className='w-10' href='#'>
                <TelegramIcon color='#9ca3af' size={2.5} />
              </a>
              <a className='w-10' href='#'>
                <TwitterIcon color='#9ca3af' size={2.5} />
              </a>
              <a className='w-10' href='#'>
                <InstagramIcon color='#9ca3af' size={2.5} />
              </a>
            </div>
          </div>
        </div>

        <div className='mt-12  border-t border-gray-200 pt-8 text-base text-gray-400 xl:text-left'>
          <div className='flex space-x-4 lg:w-full lg:justify-end'>
            <div className='lg:w-3/4 mb-5'>
              <p className=''>&copy; 2022 c. Vault Hill Limited</p>
            </div>
            <div className='flex lg:w-1/4 space-x-4 justify-end'>
              <a href='https://vaulthill.io/Documents/VHT&Cs.pdf'>
                Terms and Conditions
              </a>
              <span>•</span>
              <a href='https://vaulthill.io/Documents/VHWebsitePrivacyPolicy.pdf'>
                Privacy policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
