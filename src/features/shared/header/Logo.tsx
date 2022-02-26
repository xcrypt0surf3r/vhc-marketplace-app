import logoFull from '../../../assets/images/logos/vaulthill-logo.png'
import logoShort from '../../../assets/images/logos/vaulthill-logo2.png'

const Logo = () => {
  return (
    <div className='flex-shrink-0 flex items-center'>
      <img
        className='block lg:hidden h-8 w-auto'
        src={logoShort}
        alt='vault hill logo'
      />
      <img
        className='hidden lg:block h-8 w-auto'
        src={logoFull}
        alt='vault hill logo'
      />
    </div>
  )
}

export default Logo
