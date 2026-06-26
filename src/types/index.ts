export type EstadoCita = 'programada' | 'completada' | 'cancelada' | 'pendiente'

export type Especialidad = {
  id: string
  nombre: string
<<<<<<< HEAD
  icono: string
=======
  icono?: string
>>>>>>> 6503037 (Actualiza llamada de datos en Dashboard y AgendarCita/ Añade interfaz de login)
}

export type Doctor = {
  id: string
  nombre: string
<<<<<<< HEAD
  especialidad: string
  foto?: string
=======
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
>>>>>>> 6503037 (Actualiza llamada de datos en Dashboard y AgendarCita/ Añade interfaz de login)
}

export type Cita = {
  id: string
<<<<<<< HEAD
  paciente: string
  doctor: Doctor
  especialidad: string
=======
  paciente: Paciente
  doctor: Doctor
  especialidad: Especialidad
>>>>>>> 6503037 (Actualiza llamada de datos en Dashboard y AgendarCita/ Añade interfaz de login)
  fecha: string
  hora: string
  estado: EstadoCita
  notas?: string
}

<<<<<<< HEAD
=======
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

>>>>>>> 6503037 (Actualiza llamada de datos en Dashboard y AgendarCita/ Añade interfaz de login)
export type Paciente = {
  id: string
  nombre: string
  email: string
  telefono: string
  fechaNacimiento: string
  historial: Cita[]
}