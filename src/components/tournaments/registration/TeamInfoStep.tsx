'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface TeamInfoStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
}

export function TeamInfoStep({ formData, updateFormData, onNext }: TeamInfoStepProps) {
  const [errors, setErrors] = useState({
    teamName: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validación
    if (!formData.teamName?.trim()) {
      setErrors({ teamName: 'El nombre del equipo es requerido' })
      return
    }

    onNext()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Equipo
          </label>
          <Input
            value={formData.teamName}
            onChange={(e) => {
              updateFormData({ teamName: e.target.value })
              setErrors({ teamName: '' })
            }}
            placeholder="Ingrese el nombre del equipo"
            className={errors.teamName ? 'border-red-500' : ''}
          />
          {errors.teamName && (
            <p className="mt-1 text-sm text-red-500">{errors.teamName}</p>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            Siguiente
          </Button>
        </div>
      </form>
    </motion.div>
  )
} 