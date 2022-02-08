import { ReactNode } from 'react'
import { FooterDefault } from '../shared/footers/FooterDefault'
import { HeaderDefault } from '../shared/headers/HeaderDefault'

const LayoutDefault = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <HeaderDefault />
      <div className='py-5 lg:py-24 xs:px-7  xl:px-16 2xl:px-24 3xl:px-36'>
        {children}
      </div>
      <FooterDefault />
    </>
  )
}

export { LayoutDefault }
