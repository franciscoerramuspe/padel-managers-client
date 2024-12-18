'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ConfirmationStepProps {
  tournament: any
  formData: any
}

export function ConfirmationStep({
  tournament,
  formData
}: ConfirmationStepProps) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="text-center"
    >
      <div className="mb-6">
        <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          ¡Inscripción completada!
        </h3>
        <p className="text-gray-600">
          Tu equipo ha sido registrado exitosamente en el torneo
        </p>
      </div>

      {/* Resumen de la inscripción */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-500">Torneo</div>
            <div className="font-medium">{tournament.name}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Equipo</div>
            <div className="font-medium">{formData.teamName}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Categoría</div>
            <div className="font-medium">{formData.category}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Jugadores</div>
            <div className="space-y-1">
              {formData.players.map((player: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="font-medium">{player}</span>
                  {index === formData.captain && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                      Capitán
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          onClick={() => router.push('/dashboard')}
          className="w-full"
        >
          Ir al inicio
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push('/tournaments')}
          className="w-full"
        >
          Ver más torneos
        </Button>
      </div>
    </motion.div>
  )
} 