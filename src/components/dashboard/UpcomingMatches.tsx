import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Match {
  id: string;
  date: string;
  time: string;
  court: string;
  location: string;
  opponent?: string;
}

interface UpcomingMatchesProps {
  matches: Match[];
}

export function UpcomingMatches({ matches }: UpcomingMatchesProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Próximos Partidos</h2>
        <Button variant="outline" size="sm">Ver todos</Button>
      </div>
      
      <div className="space-y-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-blue-100 hover:bg-blue-50/50 transition-all duration-300"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            
            <div className="flex-grow">
              <h3 className="font-medium">{match.court}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{match.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{match.location}</span>
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm">Ver detalles</Button>
          </div>
        ))}
      </div>
    </div>
  );
} 