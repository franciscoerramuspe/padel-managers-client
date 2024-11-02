import { Wifi, Car, Camera, Users } from 'lucide-react'
import { BenefitItem } from '@/components/ui/benefit-item'

export function BenefitsSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Otros beneficios</h3>
      <div className="grid grid-cols-2 gap-3">
        <BenefitItem icon={Wifi} label="WiFi Gratis" />
        <BenefitItem icon={Car} label="Parking" />
        <BenefitItem icon={Camera} label="Live Cam" />
        <BenefitItem icon={Users} label="Área de espera" />
      </div>
    </div>
  )
} 