import { Home, Calendar, PlusSquare, Trophy } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export function BottomNav() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    getUser();
  }, []);

  const navigation = useMemo(() => [
    { name: 'Inicio', href: '/dashboard', icon: Home },
    { 
      name: 'Mis Reservas', 
      href: user?.id ? `/my-bookings?userId=${user.id}` : '/my-bookings', 
      icon: Calendar 
    },
    { name: 'Reservar', href: '/book', icon: PlusSquare },
    { name: 'Torneos', href: '/tournaments', icon: Trophy },
    { 
      name: 'Perfil',
      href: '/profile',
      icon: ({ className }: { className?: string }) => (
        <Avatar className={cn("h-5 w-5", className)}>
          <AvatarImage src={user?.user_metadata?.avatar_url} />
          <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      )
    },
  ], [user]);

  return (
    <div className="fixed bottom-4 left-4 right-4 md:hidden z-50">
      <div className="backdrop-blur-lg bg-white/75 rounded-2xl shadow-lg border border-white/20">
        <nav className="flex justify-around items-center p-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href.split('?')[0];
            
            return (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className={cn(
                  'flex flex-col items-center py-2 px-2 rounded-xl transition-all duration-300 min-w-[4.5rem]',
                  isActive 
                    ? 'text-blue-600 bg-blue-50/50 scale-105' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 transition-transform duration-300",
                  isActive && "transform scale-110"
                )} />
                <span className={cn(
                  "text-[10px] mt-1 transition-all duration-300 text-center truncate w-full px-1",
                  isActive ? "font-medium" : "font-normal"
                )}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 