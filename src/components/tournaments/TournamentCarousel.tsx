"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tournament } from '@/types/tournament';
import { TournamentCard } from './TournamentCard';
import { cn } from '@/lib/utils';

interface TournamentCarouselProps {
  tournaments: Tournament[];
  onTournamentSelect: (id: number) => void;
}

export function TournamentCarousel({
  tournaments,
  onTournamentSelect,
}: TournamentCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  if (tournaments.length === 0) return null;

  return (
    <div className="relative group">
      {/* Botón izquierdo */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 z-10",
            "h-10 w-10 flex items-center justify-center",
            "bg-white rounded-xl shadow-lg border border-gray-100",
            "text-gray-600 hover:text-gray-900 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          )}
          aria-label="Ver torneos anteriores"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Contenedor de torneos */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        <div className="inline-flex gap-4 px-4 min-w-full">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="w-[calc(100vw-32px)] sm:w-[400px] flex-none"
            >
              <TournamentCard tournament={tournament} />
            </div>
          ))}
        </div>
      </div>

      {/* Botón derecho */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 z-10",
            "h-10 w-10 flex items-center justify-center",
            "bg-white rounded-xl shadow-lg border border-gray-100",
            "text-gray-600 hover:text-gray-900 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          )}
          aria-label="Ver más torneos"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}