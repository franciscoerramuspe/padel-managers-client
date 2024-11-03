import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NextMatchProps {
  date: string;
  time: string;
  courtName: string;
  onViewCalendar: () => void;
}

export function NextMatch({ date, time, courtName, onViewCalendar }: NextMatchProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Próxima Reserva</h3>
        <Button variant="outline" size="sm" onClick={onViewCalendar}>
          Ver Calendario
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Calendar className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{date}</p>
          <p className="text-xl font-semibold">{time}</p>
          <p className="text-sm text-gray-500">{courtName}</p>
        </div>
      </div>
    </div>
  );
} 