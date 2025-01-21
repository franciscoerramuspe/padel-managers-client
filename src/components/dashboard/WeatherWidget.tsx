"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Wind, Droplets } from 'lucide-react';
import { getWeather, WeatherData } from '@/services/weather';

// Definimos un enum o tipo para los diferentes climas
type WeatherType = 'sunny' | 'partlyCloudy' | 'rainy' | 'thunderstorm';

// Función auxiliar para determinar qué imagen mostrar según el clima
function getWeatherImage(weatherType: WeatherType) {
  const images = {
    sunny: '/assets/sol.png',
    partlyCloudy: '/assets/solnube.png',
    rainy: '/assets/lluvia.png',
    thunderstorm: '/assets/lluviaelectrica.png'
  };

  return images[weatherType];
}

function getWeatherType(description: string): WeatherType {
  const description_lower = description.toLowerCase();
  
  if (description_lower.includes('tormenta') || description_lower.includes('thunder')) {
    return 'thunderstorm';
  }
  if (description_lower.includes('lluvia') || description_lower.includes('rain')) {
    return 'rainy';
  }
  if (description_lower.includes('nube') || description_lower.includes('cloud')) {
    return 'partlyCloudy';
  }
  return 'sunny';
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await getWeather();
        console.log('Weather data:', data); // Para debugging
        setWeather(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching weather:', err); // Para debugging
        setError('Error al cargar el clima');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Actualizar cada 30 minutos
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p>{error}</p>
        <p className="text-sm mt-2">Por favor, intenta más tarde</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="text-gray-500 text-center">
        No hay datos del clima disponibles
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Clima Actual</h3>
        <span className="text-sm text-gray-500">Montevideo</span>
      </div>
      
      <div className="flex items-center justify-center flex-col">
        <div className="relative w-24 h-24 mb-2">
          <Image
            src={getWeatherImage(getWeatherType(weather.description))}
            alt={`Clima: ${weather.description}`}
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="text-3xl font-bold text-blue-600 mb-2">
          {weather.temp}°C
        </div>
        <p className="text-gray-500 capitalize mb-4">{weather.description}</p>
        
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <Droplets className="h-4 w-4" />
              <span>Humedad</span>
            </div>
            <span className="font-medium">{weather.humidity}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <Wind className="h-4 w-4" />
              <span>Viento</span>
            </div>
            <span className="font-medium">{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
} 