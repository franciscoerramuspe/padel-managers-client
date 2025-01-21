import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface TeamStanding {
  position: number;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

interface LeagueStandingsProps {
  category: string;
  division: string;
  standings: TeamStanding[];
}

export function LeagueStandings({
  category = "Categoría Quinta",
  division = "Liga Nocturna Recrea",
  standings = [
    {
      position: 1,
      teamName: "Gutierrez/Erramuspe",
      played: 8,
      won: 7,
      drawn: 1,
      lost: 0,
      goalsFor: 16,
      goalsAgainst: 4,
      goalDifference: 12,
      points: 22
    },
    {
      position: 2,
      teamName: "Diaz/Cuevas",
      played: 8,
      won: 6,
      drawn: 1,
      lost: 1,
      goalsFor: 14,
      goalsAgainst: 6,
      goalDifference: 8,
      points: 19
    },
    {
      position: 3,
      teamName: "Rodriguez/Martinez",
      played: 8,
      won: 5,
      drawn: 2,
      lost: 1,
      goalsFor: 13,
      goalsAgainst: 7,
      goalDifference: 6,
      points: 17
    },
    {
      position: 4,
      teamName: "Fernandez/Lopez",
      played: 8,
      won: 4,
      drawn: 2,
      lost: 2,
      goalsFor: 12,
      goalsAgainst: 8,
      goalDifference: 4,
      points: 14
    },
    {
      position: 5,
      teamName: "Silva/Pereira",
      played: 8,
      won: 4,
      drawn: 1,
      lost: 3,
      goalsFor: 11,
      goalsAgainst: 9,
      goalDifference: 2,
      points: 13
    },
    {
      position: 6,
      teamName: "González/Sánchez",
      played: 8,
      won: 3,
      drawn: 2,
      lost: 3,
      goalsFor: 10,
      goalsAgainst: 10,
      goalDifference: 0,
      points: 11
    },
    {
      position: 7,
      teamName: "Castro/Núñez",
      played: 8,
      won: 2,
      drawn: 3,
      lost: 3,
      goalsFor: 9,
      goalsAgainst: 11,
      goalDifference: -2,
      points: 9
    },
    {
      position: 8,
      teamName: "Acosta/Romero",
      played: 8,
      won: 2,
      drawn: 2,
      lost: 4,
      goalsFor: 8,
      goalsAgainst: 12,
      goalDifference: -4,
      points: 8
    },
    {
      position: 9,
      teamName: "Vargas/Muñoz",
      played: 8,
      won: 1,
      drawn: 2,
      lost: 5,
      goalsFor: 7,
      goalsAgainst: 13,
      goalDifference: -6,
      points: 5
    },
    {
      position: 10,
      teamName: "Torres/Rojas",
      played: 8,
      won: 0,
      drawn: 2,
      lost: 6,
      goalsFor: 6,
      goalsAgainst: 14,
      goalDifference: -8,
      points: 2
    }
  ]
}: LeagueStandingsProps) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Tabla de Posiciones</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
              {category}
            </span>
            <span className="text-sm font-medium bg-gray-50 text-gray-600 px-3 py-1 rounded-full">
              {division}
            </span>
          </div>
        </div>
        
        <Link 
          href="/standings"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          Ver todos los resultados
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 border-b">
                <th className="px-4 py-3 text-left">Posición</th>
                <th className="px-4 py-3 text-left">Pareja</th>
                <th className="px-4 py-3 text-center">PJ</th>
                <th className="px-4 py-3 text-center">G</th>
                <th className="px-4 py-3 text-center">E</th>
                <th className="px-4 py-3 text-center">P</th>
                <th className="px-4 py-3 text-center">GF</th>
                <th className="px-4 py-3 text-center">GC</th>
                <th className="px-4 py-3 text-center">DG</th>
                <th className="px-4 py-3 text-center">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr 
                  key={team.teamName}
                  className={`
                    text-sm border-b last:border-b-0 hover:bg-gray-50 transition-colors
                    ${index < 3 ? 'bg-green-50/30' : ''}
                    ${index > standings.length - 3 ? 'bg-red-50/30' : ''}
                  `}
                >
                  <td className="px-4 py-3 font-medium">
                    <div className="flex items-center gap-2">
                      {getPositionBadge(team.position)}
                      {team.position}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{team.teamName}</td>
                  <td className="px-4 py-3 text-center">{team.played}</td>
                  <td className="px-4 py-3 text-center">{team.won}</td>
                  <td className="px-4 py-3 text-center">{team.drawn}</td>
                  <td className="px-4 py-3 text-center">{team.lost}</td>
                  <td className="px-4 py-3 text-center">{team.goalsFor}</td>
                  <td className="px-4 py-3 text-center">{team.goalsAgainst}</td>
                  <td className="px-4 py-3 text-center font-medium">
                    <span className={team.goalDifference > 0 ? 'text-green-600' : team.goalDifference < 0 ? 'text-red-600' : ''}>
                      {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-bold">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function getPositionBadge(position: number) {
  if (position === 1) {
    return <span className="w-2 h-2 rounded-full bg-yellow-400"></span>;
  }
  if (position === 2) {
    return <span className="w-2 h-2 rounded-full bg-gray-400"></span>;
  }
  if (position === 3) {
    return <span className="w-2 h-2 rounded-full bg-amber-600"></span>;
  }
  return null;
} 