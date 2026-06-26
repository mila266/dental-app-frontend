import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AgendarCita from './pages/AgendarCita'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agendar-cita" element={<AgendarCita />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App