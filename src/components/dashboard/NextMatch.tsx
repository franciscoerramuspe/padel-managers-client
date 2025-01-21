import { Calendar, Clock, MapPin, Trophy, LandPlot} from 'lucide-react';

interface NextMatchProps {
  date: string;
  opponent: string;
  location: string;
  time: string;
  category: string;
  tournament: string;
  court: string;
}

export function NextMatch({
  date = "14 de Julio",
  opponent = "Diaz/Cuevas",
  location = "Club de Pádel Central",
  time = "20:00",
  category = "Categoría Quinta",
  tournament = "Liga Nocturna Recrea",
  court = "Cancha 2"
}: NextMatchProps) {
  return (
    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl shadow-sm p-6 text-white h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-green-100" />
          <span className="font-medium">{tournament}</span>
        </div>
        <span className="px-3 py-1 text-xs font-medium bg-white/20 rounded-full">
          {category}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <div className="text-sm text-green-100 mb-1">Contra</div>
          <div className="text-lg font-semibold">{opponent}</div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-sm text-green-100 mb-1">Fecha</div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-100" />
              <span className="text-sm">{date}</span>
            </div>
          </div>
          
          <div>
            <div className="text-sm text-green-100 mb-1">Horario</div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-100" />
              <span className="text-sm">{time} hs</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-sm text-green-100 mb-1">Ubicación</div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-100" />
              <span className="text-sm">{location}</span>
            </div>
          </div>
          
          <div>
            <div className="text-sm text-green-100 mb-1">Cancha</div>
            <div className="flex items-center gap-2">
              <LandPlot className="w-4 h-4 text-green-100" />
              <span className="text-sm">{court}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 