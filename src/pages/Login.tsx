import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { loginPaciente, verificarSesion } from '@/lib/api'

export default function Login() {
    const navigate = useNavigate()
    const [dni, setDni] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')

        if (!dni || !fechaNacimiento) {
            setError('Por favor ingresa DNI y fecha de nacimiento')
            return
        }
        setError('')
        setLoading(true)
        try {
            await loginPaciente(dni, fechaNacimiento)
            navigate('/dashboard')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        verificarSesion()
            .then(() => navigate('/dashboard'))
            .catch(() => { })
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Ingresar</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">DNI</label>
                            <input
                                type="text"
                                value={dni}
                                onChange={e => setDni(e.target.value)}
                                required
                                maxLength={8}
                                placeholder="12345678"
                                className={cn('mt-1 block w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/50')}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
                            <input
                                type="date"
                                value={fechaNacimiento}
                                onChange={e => setFechaNacimiento(e.target.value)}
                                required
                                className={cn('mt-1 block w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/50')}
                            />
                        </div>

                        {error && <p className="text-sm text-red-600">{error}</p>}

                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? 'Validando...' : 'Ingresar'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
