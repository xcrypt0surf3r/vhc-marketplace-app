import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, PageNotFound } from './features'

function App() {
  return (
    <main className=''>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
