import dynamic from 'next/dynamic'
import { Clock as ClockIcon } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';

// Componente base del reloj
function BaseClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('es-UY', {
    timeZone: 'America/Montevideo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Hora Actual</h3>
        <span className="text-sm text-gray-500">Paysandú</span>
      </div>
      
      <div className="flex items-center justify-center flex-col">
        <ClockIcon className="h-12 w-12 text-blue-600 mb-3" />
        <div className="text-3xl font-bold text-blue-600">
          {formattedTime}
        </div>
      </div>
    </>
  );
}

// Exportar una versión dinámica del componente
export const ClockWidget = dynamic(() => Promise.resolve(BaseClockWidget), {
  ssr: false
}); 