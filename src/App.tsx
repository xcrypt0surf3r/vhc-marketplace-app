import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Landing, PageNotFound } from './features'

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
