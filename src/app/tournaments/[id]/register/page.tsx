'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MOCK_TOURNAMENTS } from '@/mocks/tournaments'
import { TeamInfoStep } from '@/components/tournaments/registration/TeamInfoStep'
import { CategoryStep } from '@/components/tournaments/registration/CategoryStep'
import { PlayersStep } from '@/components/tournaments/registration/PlayersStep'
import { PaymentStep } from '@/components/tournaments/registration/PaymentStep'
import { ConfirmationStep } from '@/components/tournaments/registration/ConfirmationStep'
import { Progress } from '@/components/ui/progress'
import { AppSidebar } from '@/components/app/Sidebar'
import { BottomNav } from '@/components/navigation/BottomNav'
import { TournamentBanner } from '@/components/tournaments/registration/TournamentBanner'

interface FormData {
  teamName: string;
  category: string;
  players: string[];
  captain: number | null;
  paymentMethod: string;
}

export default function TournamentRegistrationPage() {
  const params = useParams()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    category: '',
    players: [],
    captain: null,
    paymentMethod: ''
  })

  const tournament = MOCK_TOURNAMENTS.find(t => t.id === Number(params.id))

  if (!tournament) {
    return <div>Torneo no encontrado</div>
  }

  const steps = [
    { id: 1, name: 'Información del Equipo' },
    { id: 2, name: 'Categoría' },
    { id: 3, name: 'Jugadores' },
    { id: 4, name: 'Pago' },
    { id: 5, name: 'Confirmación' }
  ]

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length))
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  return (
    <div className="flex min-h-screen bg-gray-50 w-full">
      <AppSidebar />
      <main className="flex-1 overflow-x-hidden w-full">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="text-sm text-gray-600 hover:text-gray-900 mb-4 flex items-center"
            >
              ← Volver al torneo
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Inscripción: {tournament.name}
            </h1>
          </div>

          {/* Banner */}
          <div className="mb-8">
            <TournamentBanner tournament={tournament} />
          </div>

          {/* Progress */}
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
            <div className="mt-2 text-sm text-gray-600">
              Paso {currentStep} de {steps.length}
            </div>
          </div>

          {/* Form Steps */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <TeamInfoStep
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                />
              )}
              {currentStep === 2 && (
                <CategoryStep
                  tournament={tournament}
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === 3 && (
                <PlayersStep
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === 4 && (
                <PaymentStep
                  tournament={tournament}
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === 5 && (
                <ConfirmationStep
                  tournament={tournament}
                  formData={formData}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}