import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Auth } from './pages/auth'
import { Dashboard } from './pages/dashboard'
import './App.css'
import { FinancialRecordProvider } from './context/financial-record-context'

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path='/' element={<FinancialRecordProvider>
            <Dashboard />
          </FinancialRecordProvider>} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
