const API_URL = import.meta.env.VITE_API_URL

export async function loginPaciente(dni:string, fechaNacimiento:string){
  const res = await fetch(`${API_URL}/api/pacientes/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dni, fechaNacimiento }),
  })
  if (!res.ok) {
    const data = await res.json() 
    throw new Error(data.error || 'Error al iniciar sesión')
  }
  return res.json()
}

export async function verificarSesion() {
  const res = await fetch(`${API_URL}/api/pacientes/sesion`)
  if (!res.ok) throw new Error('Sin sesión activa')
  return res.json()
}

export async function getDoctores() {
  const res = await fetch(`${API_URL}/api/doctores`)
  if (!res.ok) throw new Error('Error al obtener doctores')
  return res.json()
}

export async function getDoctoresxEspecialidad(especialidadId: string) {
  const res = await fetch(`${API_URL}/api/doctores/especialidad/${especialidadId}`);

  if (!res.ok) throw new Error('Error al obtener doctores por especialidad');
  return res.json();
}

export async function getHorarioxEspecialidadDoctor(especialidadId: string, doctorId: string) {
  const res = await fetch(`${API_URL}/api/horarios/${especialidadId}/${doctorId}`);

  if (!res.ok) throw new Error('Error al obtener horarios por especialidad y doctor');
  return res.json();
}

export async function getEspecialidades() {
  const res = await fetch(`${API_URL}/api/especialidades`)
  if (!res.ok) throw new Error('Error al obtener especialidades')
  return res.json()
}

export async function getServiciosxEspecialidad(especialidadId: string) {
  const res = await fetch(`${API_URL}/api/servicios/especialidad/${especialidadId}`)
  if (!res.ok) throw new Error('Error al obtener servicios por especialidad')
  return res.json()
}

export async function getCitas() {
  const res = await fetch(`${API_URL}/api/citas`)
  if (!res.ok) throw new Error('Error al obtener citas')
  return res.json()
}


export async function crearCita(cita: {
  doctor_id: string
  especialidad_id: string
  paciente_id: string
  fecha: string
  hora: string
  notas?: string
}) {
  const res = await fetch(`${API_URL}/api/citas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cita),
  })
  if (!res.ok) throw new Error('Error al crear cita')
  return res.json()
}