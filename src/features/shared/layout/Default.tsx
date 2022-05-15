import { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import Footer from '../Footer'
import Header from '../header/Header'

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Helmet>
        <title>VHC Marketplace</title>
      </Helmet>
      <Header />
      <div className='py-5 lg:py-24 xs:px-3 xl:px-16 2xl:px-24 3xl:px-36 max-w-[140rem] mx-auto overflow-hidden'>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default DefaultLayout
