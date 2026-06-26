export type EstadoCita = 'programada' | 'completada' | 'cancelada' | 'pendiente'

export type Especialidad = {
  id: string
  nombre: string
  icono?: string
}

export type Doctor = {
  id: string
  nombre: string
}

export type DoctorEspecialidad = {
  id: string
  doctor: Doctor
  especialidad: Especialidad
}

export type Servicio = {
  id: string
  nombre: string
  duracion_minutos: number
  descripcion?: string
  precio_referencial?: number
  especialidad: Especialidad
}

export type Cita = {
  id: string
  paciente: Paciente
  doctor: Doctor
  servicio: Servicio
  consultorio: Consultorio
  fecha: string
  hora: string
  estado: EstadoCita
  notas?: string
}

export type Consultorio ={
  id:string,
  nombre: string,
}

export type Horario ={
  id: string,
  doctor: Doctor,
  especialidad: Especialidad,
  consultorio: Consultorio,
  dia_semana: number,
  hora_inicio: string,
  hora_fin: string
}

export type Paciente = {
  id: string
  nombre: string
  email: string
  telefono: string
  fechaNacimiento: string
  historial: Cita[]
}