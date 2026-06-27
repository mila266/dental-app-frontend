import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from '@/components/ui/select'
import {
  getEspecialidades,
  getDoctoresxEspecialidad,
  getHorarioxEspecialidadDoctor,
  getServiciosxEspecialidad
} from '../lib/api'
import type { DoctorEspecialidad, Especialidad, Horario, Servicio } from '../types/index'

const DIAS_SEMANA: Record<number, string> = {
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
  7: 'Domingo',
}

export default function AgendarCita() {
  const [paso, setPaso] = useState(1)
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([])
  const [doctorespecialidad, setDoctorespecialidad] = useState<DoctorEspecialidad[]>([])
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [horarios, setHorarios] = useState<Horario[]>([])

  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('')
  const [servicioSeleccionado, setServicioSeleccionado] = useState('')
  const [doctorSeleccionado, setDoctorSeleccionado] = useState('')
  const [diaSeleccionado, setDiaSeleccionado] = useState<number | null>(null)
  const [horaSeleccionada, setHoraSeleccionada] = useState('')
  const [confirmado, setConfirmado] = useState(false)

  const [loadingDoctores, setLoadingDoctores] = useState(false)
  const [loadingHorarios, setLoadingHorarios] = useState(false)
  const [loadingServicios, setLoadingServicios] = useState(false)

  useEffect(() => {
    getEspecialidades()
      .then(data => setEspecialidades(data))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if (!especialidadSeleccionada) return
    setLoadingDoctores(true)
    setLoadingServicios(true)
    setServicioSeleccionado('')
    setDoctorSeleccionado('')
    setDiaSeleccionado(null)
    setHoraSeleccionada('')
    setHorarios([])

    getDoctoresxEspecialidad(especialidadSeleccionada)
      .then(data => setDoctorespecialidad(data))
      .catch(err => console.error(err))
      .finally(() => setLoadingDoctores(false))

    getServiciosxEspecialidad(especialidadSeleccionada)
      .then(data => setServicios(data))
      .catch(err => console.error(err))
      .finally(() => setLoadingServicios(false))
  }, [especialidadSeleccionada])

  useEffect(() => {
    setDiaSeleccionado(null)
    setHoraSeleccionada('')
  }, [servicioSeleccionado])

  useEffect(() => {
    if (!especialidadSeleccionada || !doctorSeleccionado) return
    setLoadingHorarios(true)
    setDiaSeleccionado(null)
    setHoraSeleccionada('')

    getHorarioxEspecialidadDoctor(especialidadSeleccionada, doctorSeleccionado)
      .then(data => setHorarios(data))
      .catch(err => console.error(err))
      .finally(() => setLoadingHorarios(false))
  }, [doctorSeleccionado]) 

  const diasDisponibles = [...new Set(horarios.map(h => h.dia_semana))].sort()

  const doctorInfo = doctorespecialidad.find(d => d.doctor.id === doctorSeleccionado)
  const servicioInfo = servicios.find(s => s.id === servicioSeleccionado)
  const especialidadInfo = especialidades.find(e => e.id === especialidadSeleccionada)

  const generarSlots = (horaInicio: string, horaFin: string, duracion: number) => {
    const [h1, m1] = horaInicio.split(':').map(Number)
    const [h2, m2] = horaFin.split(':').map(Number)
    const start = h1 * 60 + m1
    const end = h2 * 60 + m2
    const slots: string[] = []
    let current = start

    while (current + duracion <= end) {
      const hora = `${String(Math.floor(current / 60)).padStart(2, '0')}:${String(current % 60).padStart(2, '0')}`
      slots.push(hora)
      current += duracion
    }

    return slots
  }

  const horasDisponibles = servicioInfo
    ? horarios
        .filter(h => h.dia_semana === diaSeleccionado)
        .flatMap(horario => generarSlots(horario.hora_inicio, horario.hora_fin, servicioInfo.duracion_minutos)
          .map(hora => ({ hora, consultorio: horario.consultorio, horarioId: horario.id })))
    : []

  const resetear = () => {
    setPaso(1)
    setConfirmado(false)
    setEspecialidadSeleccionada('')
    setServicioSeleccionado('')
    setDoctorSeleccionado('')
    setDiaSeleccionado(null)
    setHoraSeleccionada('')
    setHorarios([])
  }

  if (confirmado) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">¡Cita agendada!</h2>
            <p className="text-gray-500 mb-6">Tu cita ha sido registrada exitosamente.</p>
            <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2 mb-6">
              <p><span className="font-medium">Doctor:</span> {doctorInfo?.doctor.nombre}</p>
              <p><span className="font-medium">Especialidad:</span> {especialidadInfo?.nombre}</p>
              <p><span className="font-medium">Día:</span> {diaSeleccionado ? DIAS_SEMANA[diaSeleccionado] : ''}</p>
              <p><span className="font-medium">Hora:</span> {horaSeleccionada}</p>
            </div>
            <Button onClick={resetear}>Agendar otra cita</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Agendar Cita</h1>
          <p className="text-gray-500 mt-1">Sigue los pasos para reservar tu cita</p>
        </div>

        <div className="flex items-center mb-8">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${paso >= n ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {n}
              </div>
              {n < 4 && (
                <div className={`h-1 w-16 mx-1 ${paso > n ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
          <div className="ml-4 text-sm text-gray-500">
            {paso === 1 && 'Elige especialidad'}
            {paso === 2 && 'Elige tu servicio'}
            {paso === 3 && 'Elige doctor y horario'}
            {paso === 4 && 'Confirma tu cita'}
          </div>
        </div>

        {/* PASO 1 — Especialidad */}
        {paso === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>¿Qué tipo de consulta necesitas?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {especialidades.map(esp => (
                  <button
                    key={esp.id}
                    onClick={() => setEspecialidadSeleccionada(esp.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all
                      ${especialidadSeleccionada === esp.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="text-2xl mb-1">{esp.icono}</div>
                    <div className="font-medium text-gray-900">{esp.nombre}</div>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button disabled={!especialidadSeleccionada} onClick={() => setPaso(2)}>
                  Siguiente →
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* PASO 2 — Servicio */}
        {paso === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>¿Qué tipo de servicio deseas reservar?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {loadingServicios ? (
                  <p className="text-sm text-gray-400">Cargando servicios...</p>
                ) : servicios.length === 0 ? (
                  <div className="text-sm text-gray-500">No hay servicios disponibles para esta especialidad.</div>
                ) : (
                  servicios.map(servicio => (
                    <button
                      key={servicio.id}
                      onClick={() => setServicioSeleccionado(servicio.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all
                        ${servicioSeleccionado === servicio.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="font-medium text-gray-900">{servicio.nombre}</div>
                      <div className="text-sm text-gray-500">{servicio.duracion_minutos} min</div>
                      {servicio.descripcion && (
                        <div className="text-xs text-gray-400 mt-2">{servicio.descripcion}</div>
                      )}
                    </button>
                  ))
                )}
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setPaso(1)}>← Atrás</Button>
                <Button disabled={!servicioSeleccionado} onClick={() => setPaso(3)}>
                  Siguiente →
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* PASO 3 — Doctor, día y hora */}
        {paso === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Elige tu doctor y horario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Doctor disponible</p>
                {loadingDoctores ? (
                  <p className="text-sm text-gray-400">Cargando doctores...</p>
                ) : (
                  <Select value={doctorSeleccionado} onValueChange={setDoctorSeleccionado}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctorespecialidad.length === 0 ? (
                        <SelectItem value="none" disabled>
                          No hay doctores disponibles
                        </SelectItem>
                      ) : (
                        doctorespecialidad.map(doc => (
                          <SelectItem key={doc.doctor.id} value={doc.doctor.id}>
                            {doc.doctor.nombre}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {loadingHorarios && (
                <p className="text-sm text-gray-400">Cargando horarios...</p>
              )}

              {!loadingHorarios && horarios.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Días de atención disponibles
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {diasDisponibles.map(dia => (
                      <button
                        key={dia}
                        onClick={() => {
                          setDiaSeleccionado(dia)
                          setHoraSeleccionada('')
                        }}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all
                          ${diaSeleccionado === dia
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        {DIAS_SEMANA[dia]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {diaSeleccionado && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Horario de atención — {DIAS_SEMANA[diaSeleccionado]}
                  </p>
                  {horasDisponibles.length === 0 ? (
                    <p className="text-sm text-gray-500">No hay horarios disponibles para el servicio seleccionado en este día.</p>
                  ) : (
                    <div className="space-y-2">
                      {horasDisponibles.map(slot => (
                        <button
                          key={`${slot.hora}-${slot.horarioId}`}
                          onClick={() => setHoraSeleccionada(slot.hora)}
                          className={`w-full p-3 rounded-lg border-2 text-left text-sm transition-all
                            ${horaSeleccionada === slot.hora
                              ? 'border-blue-600 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{slot.hora}</span>
                            <span className="text-gray-400 text-xs">{slot.consultorio.nombre}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setPaso(1)}>← Atrás</Button>
                <Button
                  disabled={!doctorSeleccionado || !diaSeleccionado || !horaSeleccionada}
                  onClick={() => setPaso(4)}
                >
                  Siguiente →
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* PASO 4 — Confirmación */}
        {paso === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Confirma tu cita</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Especialidad</span>
                  <span className="font-medium">{especialidadInfo?.nombre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Doctor</span>
                  <span className="font-medium">{doctorInfo?.doctor.nombre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Día</span>
                  <span className="font-medium">
                    {diaSeleccionado ? DIAS_SEMANA[diaSeleccionado] : ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Hora</span>
                  <span className="font-medium">{horaSeleccionada}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setPaso(2)}>← Atrás</Button>
                <Button onClick={() => setConfirmado(true)}>
                 Confirmar cita
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  )
}