import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeBannerProps {
  userName: string;
  notificationCount?: number;
}

export function WelcomeBanner({ userName, notificationCount = 0 }: WelcomeBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-8 mb-8">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-blue-400 opacity-20 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-24 w-24 rounded-full bg-blue-600 opacity-20 blur-2xl"></div>
      
      <div className="relative flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">¡Bienvenido, {userName}!</h1>
          <p className="text-blue-100">Gestiona tus reservas y disfruta del mejor pádel</p>
        </div>
        
        <Button variant="secondary" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
} 