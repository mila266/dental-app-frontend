import { type Cita, type Doctor, type Especialidad, type Paciente } from '../types'

export const especialidades: Especialidad[] = [
  { id: '1', nombre: 'Ortodoncia', icono: '🦷' },
  { id: '2', nombre: 'Endodoncia', icono: '🔬' },
  { id: '3', nombre: 'Limpieza', icono: '✨' },
  { id: '4', nombre: 'Cirugía Oral', icono: '🏥' },
]

export const doctores: Doctor[] = [
  { id: '1', nombre: 'Dra. María López', especialidad: 'Ortodoncia' },
  { id: '2', nombre: 'Dr. Carlos Ruiz', especialidad: 'Endodoncia' },
  { id: '3', nombre: 'Dra. Ana Torres', especialidad: 'Limpieza' },
  { id: '4', nombre: 'Dr. Jorge Méndez', especialidad: 'Cirugía Oral' },
]

export const citas: Cita[] = [
  {
    id: '1',
    paciente: 'Juan Pérez',
    doctor: doctores[0],
    especialidad: 'Ortodoncia',
    fecha: '2026-07-10',
    hora: '10:00',
    estado: 'programada',
    notas: 'Revisión de brackets',
  },
  {
    id: '2',
    paciente: 'Juan Pérez',
    doctor: doctores[2],
    especialidad: 'Limpieza',
    fecha: '2026-06-15',
    hora: '09:00',
    estado: 'completada',
  },
  {
    id: '3',
    paciente: 'Juan Pérez',
    doctor: doctores[1],
    especialidad: 'Endodoncia',
    fecha: '2026-06-01',
    hora: '11:30',
    estado: 'cancelada',
  },
]

export const paciente: Paciente = {
  id: '1',
  nombre: 'Juan Pérez',
  email: 'juan@email.com',
  telefono: '999-888-777',
  fechaNacimiento: '1990-05-15',
  historial: citas,
}