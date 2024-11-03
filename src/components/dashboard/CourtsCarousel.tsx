"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface Court {
  id: string;
  name: string;
  location: string;
  rating: number;
}

interface CourtsCarouselProps {
  courts: Court[];
  onCourtSelect: (courtId: string) => void;
}

export function CourtsCarousel({ courts, onCourtSelect }: CourtsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCourt = () => {
    setCurrentIndex((prev) => (prev + 1) % courts.length);
  };

  const prevCourt = () => {
    setCurrentIndex((prev) => (prev - 1 + courts.length) % courts.length);
  };

  if (!courts || courts.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center">
        <p className="text-gray-500">No hay canchas disponibles</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="lg:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm"
          >
            {courts[currentIndex] && (
              <>
                <div className="relative h-64">
                  <Image
                    src="/assets/padelcancha.jpeg"
                    alt={courts[currentIndex].name || 'Cancha de padel'}
                    fill
                    className="object-cover"
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

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{courts[currentIndex].name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">4.85</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{courts[currentIndex].location}</span>
                  </div>
                  <Button 
                    onClick={() => onCourtSelect(courts[currentIndex].id)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Ver Detalles
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {courts.length > 1 && (
          <>
            <div className="absolute inset-y-0 left-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevCourt}
                className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={nextCourt}
                className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {courts.length > 1 && (
          <div className="flex justify-center gap-1 mt-4">
            {courts.map((_, idx) => (
              <button
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-4 bg-blue-500' : 'w-1.5 bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 