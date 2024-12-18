'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Tournament {
  id: number;
  name: string;
  availableSpots: Record<string, number>;
  totalTeams: Record<string, number>;
}

interface CategoryStepProps {
  tournament: Tournament;
  formData: {
    category: string;
  };
  updateFormData: (data: Partial<{ category: string }>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function CategoryStep({ 
  tournament, 
  formData, 
  updateFormData, 
  onNext, 
  onBack 
}: CategoryStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.category) {
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
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Selecciona una categoría
          </label>
          
          <RadioGroup
            value={formData.category}
            onValueChange={(value: string) => updateFormData({ category: value })}
            className="grid gap-4"
          >
            {Object.entries(tournament.availableSpots).map(([category, spots]) => {
              const isDisabled = spots === 0
              return (
                <div key={category}>
                  <RadioGroupItem
                    value={category}
                    id={category}
                    disabled={isDisabled}
                    className="peer hidden"
                  />
                  <Label
                    htmlFor={category}
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer peer-disabled:opacity-50 peer-disabled:cursor-not-allowed peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-blue-500 hover:bg-gray-50"
                  >
                    <div>
                      <div className="font-medium">{category}</div>
                      <div className="text-sm text-gray-500">
                        {spots} cupos disponibles
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${isDisabled ? 'text-red-500' : 'text-green-500'}`}>
                      {isDisabled ? 'Completo' : 'Disponible'}
                    </div>
                  </Label>
                </div>
              )
            })}
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Atrás
          </Button>
          <Button type="submit" disabled={!formData.category}>
            Siguiente
          </Button>
        </div>
      </form>
    </motion.div>
  )
} 