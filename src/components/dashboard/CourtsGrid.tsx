import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Court } from '@/types';

interface CourtsGridProps {
  courts: Court[];
  onCourtSelect: (courtId: string) => void;
}

export function CourtsGrid({ courts, onCourtSelect }: CourtsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
      {courts.map((court) => (
        <div
          key={court.id}
          className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
        >
          <div className="relative h-48 xl:h-56">
            <Image
              src="/assets/padelcancha.jpeg"
              alt={court.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <span className="bg-white/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-sm font-medium">
                2 vs 2
              </span>
              <span className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                Disponible
              </span>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{court.name}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>Paysandu, Uruguay</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-yellow-700">4.85</span>
              </div>
            </div>

            <Button
              onClick={() => onCourtSelect(court.id)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Ver Detalles
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
} 