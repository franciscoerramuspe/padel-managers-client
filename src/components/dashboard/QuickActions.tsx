import { Calendar, Search, Trophy, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {[
        {
          icon: Calendar,
          label: 'Nueva Reserva',
          color: 'bg-green-500',
          href: '/book'
        },
        {
          icon: Search,
          label: 'Buscar Cancha',
          color: 'bg-blue-500',
          href: '/courts'
        },
        {
          icon: Trophy,
          label: 'Torneos',
          color: 'bg-purple-500',
          href: '/tournaments'
        },
        {
          icon: Clock,
          label: 'Historial',
          color: 'bg-orange-500',
          href: '/history'
        }
      ].map((action) => (
        <Button
          key={action.label}
          variant="ghost"
          className={`h-24 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-300`}
        >
          <div className={`${action.color} text-white p-2 rounded-lg`}>
            <action.icon className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium">{action.label}</span>
        </Button>
      ))}
    </div>
  );
} 