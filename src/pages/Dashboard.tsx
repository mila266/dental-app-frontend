import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Cita } from '../types/index'
import { getCitas } from '../lib/api'

const coloresBadge: Record<string, string> = {
  programada: 'bg-blue-100 text-blue-700',
  completada: 'bg-green-100 text-green-700',
  cancelada: 'bg-red-100 text-red-700',
  pendiente: 'bg-yellow-100 text-yellow-700',
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [citas, setCitas] = useState<Cita[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCitas()
      .then(data => setCitas(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])
  
  const proxima = citas.find(c => c.estado === 'programada')
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <p className="text-gray-500"> Cargando ... </p>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenida 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Aquí tienes un resumen de tus citas
        </p>
        <Button onClick={() => navigate('/agendar-cita')} className="mt-4"> Agendar Cita </Button>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total citas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{citas.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Programadas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {citas.filter(c => c.estado === 'programada').length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Completadas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {citas.filter(c => c.estado === 'completada').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Próxima cita */}
      {proxima && (
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-700">📅 Tu próxima cita</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700">
              <User size={16} />
              <span>{proxima.doctor.nombre}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar size={16} />
              <span>{proxima.fecha}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock size={16} />
              <span>{proxima.hora}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de citas */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de citas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {citas.map(cita => (
              <div
                key={cita.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border"
              >
                <div>
                  <p className="font-medium text-gray-900">{cita.doctor.nombre}</p>
                  <p className="text-sm text-gray-500">{cita.servicio.especialidad.nombre} · {cita.fecha} </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${coloresBadge[cita.estado]}`}>
                  {cita.estado}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}