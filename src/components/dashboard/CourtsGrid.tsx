import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Court } from "@/types";

interface CourtsGridProps {
  courts: Court[];
  onCourtSelect: (courtId: string) => void;
}

export function CourtsGrid({ courts, onCourtSelect }: CourtsGridProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const courtsPerPage = 3;
  const totalPages = Math.ceil(courts.length / courtsPerPage);
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentCourts = courts.slice(
    currentPage * courtsPerPage,
    (currentPage + 1) * courtsPerPage
  );

  if (!courts || courts.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center">
        <p className="text-gray-500">No hay canchas disponibles</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
        >
          {currentCourts.map((court) => (
            <div
              key={court.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
            >
              <div className="relative h-48 xl:h-56">
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-white/90 backdrop-blur-sm text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                    1200/hr
                  </span>
                </div>
                <Image
                  src="/assets/padelcancha.jpeg"
                  alt={court.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="bg-orange-100 backdrop-blur-sm text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                    ¡Pocos horarios!
                  </span>
                  <span className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    Disponible
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{court.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">4.85</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{court.location}</span>
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
        </motion.div>   
      </AnimatePresence>

      {courts.length > courtsPerPage && (
        <>
          <div className="absolute inset-y-0 -left-4 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevPage}
              className="h-8 w-8 rounded-full bg-white shadow-md hover:bg-gray-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute inset-y-0 -right-4 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={nextPage}
              className="h-8 w-8 rounded-full bg-white shadow-md hover:bg-gray-100"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
} 