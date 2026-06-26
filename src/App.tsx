import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
<<<<<<< HEAD
=======
import AgendarCita from './pages/AgendarCita'
import Login from './pages/Login'
>>>>>>> 6503037 (Actualiza llamada de datos en Dashboard y AgendarCita/ Añade interfaz de login)

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Dashboard />} />
=======
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agendar-cita" element={<AgendarCita />} />
>>>>>>> 6503037 (Actualiza llamada de datos en Dashboard y AgendarCita/ Añade interfaz de login)
      </Routes>
    </BrowserRouter>
  )
}

export default App