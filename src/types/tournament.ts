export interface Tournament {
  id: number
  name: string
  startDate: string
  endDate: string
  categories: string[]
  availableSpots: { [key: string]: number }
  totalTeams: { [key: string]: number }
  registrationDeadline: string
  price: number
  status: "open" | "closed" | "in_progress"
  image: string
  prizes: {
    firstPlace: string
    secondPlace: string
    thirdPlace: string
  }
  benefits: string[]
  location: string
  format: string
  matchDuration: string
  teamsPerCategory: number
  description: string
  rules: string[]
  sponsors: {
    name: string
    logo: string
    website?: string
    tier: "platinum" | "gold" | "silver" | "bronze"
  }[]
  venue: {
    name: string
    address: string
    coordinates?: {
      lat: number
      lng: number
    }
    facilities: string[]
    parkingAvailable: boolean
  }
  schedule: {
    date: string
    events: {
      time: string
      description: string
    }[]
  }[]
  organizer: {
    name: string
    contact: string
    logo?: string
  }
  registrationInstructions?: string
} 