export type EstadoCita = 'programada' | 'completada' | 'cancelada' | 'pendiente'

export type Especialidad = {
  id: string
  nombre: string
  icono: string
}

export type Doctor = {
  id: string
  nombre: string
  especialidad: string
  foto?: string
}

export type Cita = {
  id: string
  paciente: string
  doctor: Doctor
  especialidad: string
  fecha: string
  hora: string
  estado: EstadoCita
  notas?: string
}

export type Paciente = {
  id: string
  nombre: string
  email: string
  telefono: string
  fechaNacimiento: string
  historial: Cita[]
}