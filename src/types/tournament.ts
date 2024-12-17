export interface Tournament {
  id: number
  name: string
  startDate: string
  endDate: string
  categories: string[]
  availableSpots: Record<string, number>
  totalTeams: Record<string, number>
  registrationDeadline: string
  price: number
  status: 'open' | 'closed' | 'finished'
  image?: string
} 