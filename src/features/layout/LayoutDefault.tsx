import { ReactNode } from 'react'
import { FooterDefault } from '../shared/footers/FooterDefault'
import { HeaderDefault } from '../shared/headers/HeaderDefault'

const LayoutDefault = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <HeaderDefault />
      <div className='py-5 lg:py-24'>{children}</div>
      <FooterDefault />
    </>
  )
}

export { LayoutDefault }
