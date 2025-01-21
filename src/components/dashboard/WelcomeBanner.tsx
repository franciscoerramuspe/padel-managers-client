import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface WelcomeBannerProps {
  userName: string;
  notificationCount?: number;
  avatarUrl?: string;
  email?: string;
}

export function WelcomeBanner({ 
  userName, 
  notificationCount = 0, 
  avatarUrl,
  email 
}: WelcomeBannerProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-8 mb-8">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-blue-400/10 via-white/5 to-blue-400/10 blur-2xl"></div>
      
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="lg:hidden">
              <Avatar className="h-12 w-12 border-2 border-white/50 shadow-lg cursor-pointer hover:opacity-90 transition-opacity">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="bg-blue-600 text-white">
                  {userName?.charAt(0)?.toUpperCase() || email?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden lg:block">
            <Avatar className="h-12 w-12 border-2 border-white/50 shadow-lg">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="bg-blue-600 text-white">
                {userName?.charAt(0)?.toUpperCase() || email?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
              ¡Hola 👋 {userName}!
            </h1>
            <p className="text-blue-50/90">
              Gestiona tus reservas y disfruta del mejor pádel
            </p>
          </div>
        </div>
      
      </div>
    </div>
  );
} 