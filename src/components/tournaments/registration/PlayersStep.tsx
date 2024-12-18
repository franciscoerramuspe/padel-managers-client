'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { X, Users } from 'lucide-react'

interface PlayersStepProps {
  formData: {
    players: string[];
    captain: number | null;
  };
  updateFormData: (data: Partial<{
    players: string[];
    captain: number | null;
  }>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PlayersStep({
  formData,
  updateFormData,
  onNext,
  onBack
}: PlayersStepProps) {
  const [newPlayer, setNewPlayer] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const handleAddPlayer = () => {
    if (!newPlayer.trim()) {
      setErrors(['El nombre del jugador es requerido'])
      return
    }

    if (formData.players.includes(newPlayer.trim())) {
      setErrors(['Este jugador ya ha sido agregado'])
      return
    }

    updateFormData({
      players: [...formData.players, newPlayer.trim()]
    })
    setNewPlayer('')
    setErrors([])
  }

  const handleRemovePlayer = (index: number) => {
    const newPlayers = formData.players.filter((_: any, i: number) => i !== index)
    updateFormData({ players: newPlayers })
  }

  const handleSetCaptain = (playerIndex: number) => {
    updateFormData({ captain: playerIndex })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.players.length >= 2 && formData.captain !== null) {
      onNext()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Agrega los jugadores de tu equipo
          </label>

          <div className="space-y-4">
            {/* Lista de jugadores */}
            {formData.players.map((player: string, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={formData.captain === index}
                    onCheckedChange={() => handleSetCaptain(index)}
                  />
                  <span className="text-sm">{player}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemovePlayer(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}

            {/* Agregar nuevo jugador */}
            <div className="flex gap-2">
              <Input
                value={newPlayer}
                onChange={(e) => setNewPlayer(e.target.value)}
                placeholder="Nombre del jugador"
                className={errors.length ? 'border-red-500' : ''}
              />
              <Button
                type="button"
                onClick={handleAddPlayer}
                variant="outline"
              >
                Agregar
              </Button>
            </div>
            {errors.map((error, index) => (
              <p key={index} className="text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-500">
            <p>• Mínimo 2 jugadores</p>
            <p>• Selecciona un capitán marcando la casilla</p>
          </div>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Atrás
          </Button>
          <Button
            type="submit"
            disabled={formData.players.length < 2 || formData.captain === null}
          >
            Siguiente
          </Button>
        </div>
      </form>
    </motion.div>
  )
} 