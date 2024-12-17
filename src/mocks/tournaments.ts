import { Tournament } from "@/types/tournament"

export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: 1,
    name: "Torneo de Verano 2024",
    startDate: "2024-07-15",
    endDate: "2024-07-20",
    categories: ["Primera", "Segunda", "Tercera"],
    availableSpots: {
      "Primera": 8,
      "Segunda": 12,
      "Tercera": 6
    },
    totalTeams: {
      "Primera": 16,
      "Segunda": 16,
      "Tercera": 8
    },
    registrationDeadline: "2024-07-01",
    price: 50,
    status: "open",
    image: "/assets/canchapadel.jpeg",
    location: "Club de Pádel Central",
    format: "Fase de grupos + eliminatorias",
    matchDuration: "1 hora y media",
    teamsPerCategory: 16,
    description: "El Torneo de Verano 2024 es el evento más esperado de la temporada. Con las mejores instalaciones y un formato que garantiza partidos emocionantes.",
    rules: [
      "Los partidos se jugarán al mejor de 3 sets con tie-break",
      "Cada equipo debe presentarse 15 minutos antes",
      "Se utilizará el sistema de punto de oro",
      "Los equipos deben mantener la misma formación",
      "Se aplicará W.O. después de 15 minutos de tolerancia"
    ],
    sponsors: [
      {
        name: "Head",
        logo: "/assets/sponsors/head.svg",
        website: "https://www.head.com",
        tier: "platinum"
      },
      {
        name: "Gatorade",
        logo: "/assets/sponsors/gatorade.svg",
        website: "https://www.gatorade.com",
        tier: "gold"
      }
    ],
    venue: {
      name: "Club de Pádel Central",
      address: "Av. del Deporte 123",
      coordinates: {
        lat: -34.6037,
        lng: -58.3816
      },
      facilities: [
        "8 canchas de cristal",
        "Vestuarios con duchas",
        "Cafetería",
        "Zona de calentamiento"
      ],
      parkingAvailable: true
    },
    schedule: [
      {
        date: "2024-07-15",
        events: [
          {
            time: "09:00",
            description: "Inicio fase de grupos - Primera"
          },
          {
            time: "14:00",
            description: "Inicio fase de grupos - Segunda"
          }
        ]
      }
    ],
    organizer: {
      name: "Club de Pádel Central",
      contact: "torneos@clubcentral.com",
      logo: "/assets/organizers/central.png"
    },
    prizes: {
      firstPlace: "Trofeo + $100.000",
      secondPlace: "Trofeo + $50.000",
      thirdPlace: "Trofeo + $25.000"
    },
    benefits: [
      "Kit de bienvenida",
      "Hidratación durante partidos",
      "Pelotas oficiales",
      "Fisioterapeuta disponible"
    ]
  },
  {
    id: 2,
    name: "Copa Primavera",
    startDate: "2024-09-10",
    endDate: "2024-09-15",
    categories: ["Cuarta", "Quinta", "Sexta"],
    availableSpots: {
      "Cuarta": 4,
      "Quinta": 8,
      "Sexta": 12
    },
    totalTeams: {
      "Cuarta": 16,
      "Quinta": 16,
      "Sexta": 16
    },
    registrationDeadline: "2024-08-25",
    price: 45,
    status: "open",
    image: "/assets/canchapadel.jpeg",
    location: "Complejo Deportivo Norte",
    format: "Eliminación directa",
    matchDuration: "1 hora",
    teamsPerCategory: 16,
    description: "La Copa Primavera es el torneo perfecto para comenzar la temporada. Ideal para categorías intermedias.",
    rules: [
      "Sistema de eliminación directa",
      "Partidos al mejor de 3 sets",
      "Punto de oro en todos los games",
      "15 minutos de tolerancia"
    ],
    sponsors: [
      {
        name: "Wilson",
        logo: "/assets/sponsors/wilson.svg",
        website: "https://www.wilson.com",
        tier: "platinum"
      }
    ],
    venue: {
      name: "Complejo Deportivo Norte",
      address: "Av. Norte 456",
      coordinates: {
        lat: -34.5837,
        lng: -58.4016
      },
      facilities: [
        "6 canchas de cristal",
        "Vestuarios",
        "Cafetería"
      ],
      parkingAvailable: true
    },
    schedule: [
      {
        date: "2024-09-10",
        events: [
          {
            time: "09:00",
            description: "Primera ronda"
          }
        ]
      }
    ],
    organizer: {
      name: "Complejo Deportivo Norte",
      contact: "info@deportivonorte.com",
      logo: "/assets/organizers/norte.png"
    },
    prizes: {
      firstPlace: "Trofeo + $80.000",
      secondPlace: "Trofeo + $40.000",
      thirdPlace: "Trofeo + $20.000"
    },
    benefits: [
      "Kit deportivo",
      "Hidratación",
      "Pelotas Wilson"
    ]
  },
  {
    id: 3,
    name: "Torneo Metropolitano",
    startDate: "2024-10-20",
    endDate: "2024-10-25",
    categories: ["Primera", "Segunda"],
    availableSpots: {
      "Primera": 6,
      "Segunda": 10
    },
    totalTeams: {
      "Primera": 12,
      "Segunda": 16
    },
    registrationDeadline: "2024-10-05",
    price: 60,
    status: "open",
    image: "/assets/canchapadel.jpeg",
    location: "Club Metropolitano",
    format: "Round Robin + Playoffs",
    matchDuration: "2 horas",
    teamsPerCategory: 16,
    description: "El Torneo Metropolitano reúne a los mejores jugadores de la región en un formato innovador.",
    rules: [
      "Fase de grupos + playoffs",
      "Partidos al mejor de 3 sets",
      "Tie-break en todos los sets",
      "Cambio de pelotas cada partido"
    ],
    sponsors: [
      {
        name: "Adidas",
        logo: "/assets/sponsors/adidas.svg",
        website: "https://www.adidas.com",
        tier: "platinum"
      }
    ],
    venue: {
      name: "Club Metropolitano",
      address: "Av. Central 789",
      coordinates: {
        lat: -34.6137,
        lng: -58.4216
      },
      facilities: [
        "10 canchas premium",
        "Gimnasio",
        "Restaurant",
        "Spa"
      ],
      parkingAvailable: true
    },
    schedule: [
      {
        date: "2024-10-20",
        events: [
          {
            time: "10:00",
            description: "Ceremonia inaugural"
          }
        ]
      }
    ],
    organizer: {
      name: "Club Metropolitano",
      contact: "torneos@metropolitano.com",
      logo: "/assets/organizers/metro.png"
    },
    prizes: {
      firstPlace: "Trofeo + $150.000",
      secondPlace: "Trofeo + $75.000",
      thirdPlace: "Trofeo + $37.500"
    },
    benefits: [
      "Equipación completa",
      "Servicio de fisioterapia",
      "Análisis de video",
      "Alojamiento incluido"
    ]
  },
  {
    id: 4,
    name: "Copa Elite",
    startDate: "2024-11-05",
    endDate: "2024-11-10",
    categories: ["Primera Elite"],
    availableSpots: {
      "Primera Elite": 4
    },
    totalTeams: {
      "Primera Elite": 8
    },
    registrationDeadline: "2024-10-20",
    price: 100,
    status: "open",
    image: "/assets/canchapadel.jpeg",
    location: "Elite Padel Club",
    format: "Round Robin + Final Four",
    matchDuration: "2 horas",
    teamsPerCategory: 8,
    description: "Torneo exclusivo para los mejores jugadores del circuito. Solo 8 parejas, premios excepcionales.",
    rules: [
      "Todos contra todos",
      "Los 4 mejores a semifinales",
      "Partidos televisados",
      "Arbitraje profesional"
    ],
    sponsors: [
      {
        name: "Rolex",
        logo: "/assets/sponsors/rolex.svg",
        website: "https://www.rolex.com",
        tier: "platinum"
      }
    ],
    venue: {
      name: "Elite Padel Club",
      address: "Av. Luxury 123",
      coordinates: {
        lat: -34.5737,
        lng: -58.4116
      },
      facilities: [
        "Cancha central con gradas",
        "Vestuarios VIP",
        "Lounge exclusivo",
        "Helipuerto"
      ],
      parkingAvailable: true
    },
    schedule: [
      {
        date: "2024-11-05",
        events: [
          {
            time: "18:00",
            description: "Gala inaugural"
          }
        ]
      }
    ],
    organizer: {
      name: "Elite Padel Association",
      contact: "vip@elitepadel.com",
      logo: "/assets/organizers/elite.png"
    },
    prizes: {
      firstPlace: "Trofeo + $500.000",
      secondPlace: "Trofeo + $250.000",
      thirdPlace: "Trofeo + $125.000"
    },
    benefits: [
      "Alojamiento 5 estrellas",
      "Transporte privado",
      "Equipamiento completo",
      "Cobertura mediática"
    ]
  },
  {
    id: 5,
    name: "Torneo Amateur",
    startDate: "2024-12-01",
    endDate: "2024-12-03",
    categories: ["Quinta", "Sexta", "Séptima"],
    availableSpots: {
      "Quinta": 16,
      "Sexta": 16,
      "Séptima": 16
    },
    totalTeams: {
      "Quinta": 32,
      "Sexta": 32,
      "Séptima": 32
    },
    registrationDeadline: "2024-11-15",
    price: 30,
    status: "open",
    image: "/assets/canchapadel.jpeg",
    location: "Club Social y Deportivo",
    format: "Eliminación directa",
    matchDuration: "1 hora",
    teamsPerCategory: 32,
    description: "Torneo pensado para jugadores amateur que quieren iniciarse en la competición.",
    rules: [
      "Un set a 9 juegos",
      "Punto de oro",
      "Auto-arbitraje",
      "Espíritu deportivo"
    ],
    sponsors: [
      {
        name: "Deportes Local",
        logo: "/assets/sponsors/local.svg",
        website: "https://www.deporteslocal.com",
        tier: "gold"
      }
    ],
    venue: {
      name: "Club Social y Deportivo",
      address: "Calle del Deporte 456",
      coordinates: {
        lat: -34.6337,
        lng: -58.4316
      },
      facilities: [
        "4 canchas",
        "Vestuarios",
        "Cantina",
        "Estacionamiento"
      ],
      parkingAvailable: true
    },
    schedule: [
      {
        date: "2024-12-01",
        events: [
          {
            time: "09:00",
            description: "Inicio del torneo"
          }
        ]
      }
    ],
    organizer: {
      name: "Club Social y Deportivo",
      contact: "deportes@clubsocial.com",
      logo: "/assets/organizers/social.png"
    },
    prizes: {
      firstPlace: "Trofeo + $30.000",
      secondPlace: "Trofeo + $15.000",
      thirdPlace: "Trofeo + $7.500"
    },
    benefits: [
      "Camiseta del torneo",
      "Hidratación",
      "Frutas",
      "Foto grupal"
    ]
  }
] 