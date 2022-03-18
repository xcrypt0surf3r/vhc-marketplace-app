import logoFull from '../../../assets/images/logos/vaulthill-logo-full.svg'
import logoShort from '../../../assets/images/logos/vaulthill-logo-short.svg'

const Logo = () => {
  return (
    <div className='flex-shrink-0 flex items-center'>
      <img
        className='block lg:hidden h-10 w-auto'
        src={logoShort}
        alt='vault hill logo'
      />
      <img
        className='hidden lg:block h-13 w-auto'
        src={logoFull}
        alt='vault hill logo'
      />
    </div>
  )
}

export default Logo
