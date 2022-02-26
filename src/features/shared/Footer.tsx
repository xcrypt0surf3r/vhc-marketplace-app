import {
  InstagramIcon,
  TelegramIcon,
  TwitterIcon
} from '../../assets/images/icons'
import Logo from './header/Logo'

const navigation = {
  vaulthill: [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#' },
    { name: 'FAQs', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Partners', href: '#' }
  ],
  community: [
    { name: 'Discord community', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Newsletter', href: '#' },
    { name: 'Help center', href: '#' },
    { name: 'Privacy policy', href: '#' }
  ],
  marketplace: [
    { name: 'All virtual lands', href: '#' },
    { name: 'Terms and conditions', href: '#' },
    { name: 'Development', href: '#' },
    { name: 'Inspect', href: '#' }
  ]
}

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
              Vault Hill is a decentralised virtual reality (VR) and augmented
              reality (AR) world, also known as a metaverse where users can
              interact with computer-generated imagery (CGI) and other users.
            </p>
            <div className='flex space-x-6'>
              <a href='#'>
                <TelegramIcon color='#9ca3af' size={2.5} />
              </a>
              <a href='#'>
                <TwitterIcon color='#9ca3af' size={2.5} />
              </a>
              <a href='#'>
                <InstagramIcon color='#9ca3af' size={2.5} />
              </a>
            </div>
          </div>
          <div className='mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2'>
            <div className='md:grid md:grid-cols-2 md:gap-8'>
              <div>
                <h3 className='text-sm font-bold text-black  tracking-wider uppercase'>
                  Vault Hill
                </h3>
                <ul role='list' className='mt-4 space-y-4'>
                  {navigation.vaulthill.map((item) => (
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
              <div className='mt-12 md:mt-0'>
                <h3 className='text-sm font-bold text-black  tracking-wider uppercase'>
                  Community
                </h3>
                <ul role='list' className='mt-4 space-y-4'>
                  {navigation.community.map((item) => (
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
            </div>
            <div className='md:grid md:grid-cols-2 md:gap-8'>
              <div>
                <h3 className='text-sm font-bold text-black  tracking-wider uppercase'>
                  Marketplace
                </h3>
                <ul role='list' className='mt-4 space-y-4'>
                  {navigation.marketplace.map((item) => (
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
            </div>
          </div>
        </div>
        <div className='mt-12  border-t border-gray-200 pt-8 text-base text-gray-400 xl:text-center'>
          <p className='mb-5'>
            We believe VR and AR are at the forefront of reshaping user
            experiences whilst leveraging the power of blockchain technology and
            cloud computing create value for developers and investors through
            non-fungible tokens (NFTs).
          </p>
          <p className=''>&copy; 2022 Vault Hill, Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
