import { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

const LayoutDefault = ({ children }: { children: ReactNode }) => {
  return (
    <div className='mx-10'>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export { LayoutDefault as Layout }
