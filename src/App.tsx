import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  RouteProps,
  Routes
} from 'react-router-dom'
import logoShort from './assets/images/logos/vaulthill-logo-short.svg'
import { routes } from './routes'

const Loading = () => (
  <div className='container mx-auto pt-48 h-screen'>
    <img className='h-8 block mx-auto' src={logoShort} alt='vault hill logo' />
    <div className='overflow-hidden w-40 mt-2 h-1 mx-auto bg-blue-100'>
      <div className='w-full h-full bg-blue-500 progress-bar origin-left' />
    </div>
  </div>
)
function App() {
  return (
    <div>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {routes.map((route: RouteProps, index: number) => (
              <Route key={index} {...route} />
            ))}
          </Routes>
        </Suspense>
      </Router>
    </div>
  )
}

export default App
