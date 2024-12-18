'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditCard, Wallet, Loader2 } from 'lucide-react'

interface PaymentStepProps {
  tournament: any
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function PaymentStep({
  tournament,
  formData,
  updateFormData,
  onNext,
  onBack
}: PaymentStepProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.paymentMethod) {
      setIsProcessing(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        onNext()
      } catch (error) {
        console.error('Error processing payment:', error)
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const paymentMethods = [
    {
      id: 'credit_card',
      name: 'Tarjeta de crédito',
      description: 'Pago seguro con tarjeta',
      icon: CreditCard
    },
    {
      id: 'mercado_pago',
      name: 'Mercado Pago',
      description: 'Pago con Mercado Pago',
      icon: Wallet
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Resumen de pago */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Inscripción</span>
            <span className="font-medium">${tournament.price}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Jugadores</span>
            <span className="font-medium">{formData.players.length}</span>
          </div>
          <div className="pt-2 border-t">
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-medium">${tournament.price}</span>
            </div>
          </div>
        </div>

        {/* Métodos de pago */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Selecciona un método de pago
          </label>
          
          <RadioGroup
            value={formData.paymentMethod}
            onValueChange={(value) => updateFormData({ paymentMethod: value })}
            className="grid gap-4"
          >
            {paymentMethods.map((method) => (
              <div key={method.id}>
                <RadioGroupItem
                  value={method.id}
                  id={method.id}
                  className="peer hidden"
                />
                <Label
                  htmlFor={method.id}
                  className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-blue-500 hover:bg-gray-50"
                >
                  <method.icon className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-gray-500">{method.description}</div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Atrás
          </Button>
          <Button 
            type="submit" 
            disabled={!formData.paymentMethod || isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              'Confirmar pago'
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  )
} 