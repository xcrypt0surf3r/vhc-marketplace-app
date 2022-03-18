import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logos/vaulthill-logo-short.svg'

const PageNoFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <div className='container mx-auto py-24 lg:py-36'>
        <div className='flex flex-col w-full items-center'>
          <Link to='/' className='inline'>
            <img className='h-8 lg:h-12 inline' src={logo} alt='logo' />
          </Link>
        </div>
        <div className='flex flex-col justify-center text-center pt-16 px-4'>
          <p className='text-sm font-semibold text-blue-500 uppercase'>
            404 error
          </p>
          <h1 className='mt-2 text-2xl lg:text-4xl font-extrabold text-gray-900 tracking-tight'>
            Page not found.
          </h1>
          <p className='mt-2 text-sm lg:text-base text-gray-500'>
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className='mt-6'>
            <Link
              to='/'
              className='text-sm lg:text-base text-gray-900 font-medium hover:underline'
            >
              Go back home<span> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageNoFound
