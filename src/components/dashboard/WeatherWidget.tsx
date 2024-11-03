"use client";

import { useEffect, useState } from 'react';
import { Cloud, Wind, Droplets } from 'lucide-react';
import { getWeather, WeatherData } from '@/services/weather';

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather();
        setWeather(data);
      } catch (err) {
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
      <div className="bg-white rounded-xl shadow-sm p-6 h-full animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 h-full">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Clima Actual</h3>
        <span className="text-sm text-gray-500">Paysandú</span>
      </div>
      
      {weather && (
        <div className="flex items-center justify-center flex-col">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="Weather icon"
            className="w-16 h-16"
          />
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
      )}
    </div>
  );
} 