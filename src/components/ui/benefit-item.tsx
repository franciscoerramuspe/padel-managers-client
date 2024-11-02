import { LucideIcon } from 'lucide-react'

interface BenefitItemProps {
  icon: LucideIcon
  label: string
}

export function BenefitItem({ icon: Icon, label }: BenefitItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
      <div className="p-2 bg-green-100 rounded-full">
        <Icon className="h-5 w-5 text-green-600" />
      </div>
      <span className="text-gray-700">{label}</span>
    </div>
  )
} 