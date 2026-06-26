import { supabase } from './supabase'

const API_URL = import.meta.env.VITE_API_URL

export async function loginPaciente(dni: string, fechaNacimiento: string) {
  const res = await fetch(`${API_URL}/api/pacientes/buscar-dni`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dni, fechaNacimiento }),
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'DNI o fecha incorrectos')
  }

  const { email } = await res.json()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: fechaNacimiento,
  })

  if (error) throw new Error('Credenciales incorrectas')

  return data
}

export async function cerrarSesion() {
  await supabase.auth.signOut()
}

export async function obtenerSesion() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

export async function obtenerUsuario() {
  const { data } = await supabase.auth.getUser()
  return data.user
}