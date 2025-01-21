"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/Sidebar";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget"; 
import { supabase } from '@/lib/supabase';
import { User } from "@supabase/supabase-js";
import { BottomNav } from "@/components/navigation/BottomNav";
import { SkeletonWelcomeBanner } from "@/components/dashboard/skeletons/SkeletonWelcomeBanner";
import { SkeletonQuickActions } from "@/components/dashboard/skeletons/SkeletonQuickActions";
import { SkeletonWeatherWidget } from "@/components/dashboard/skeletons/SkeletonWeatherWidget";
import { TournamentBanner } from "@/components/dashboard/TournamentBanner"
import { LastMatchResult } from "@/components/dashboard/LastMatchResult";
import { LeagueStandings } from "@/components/dashboard/LeagueStandings";
import { mockLeagueStandings } from '@/mocks/leagueStandings';
import { NextMatch } from "@/components/dashboard/NextMatch";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await supabase.auth.getUser();
        
        if (userData.data.user) {
          setUser(userData.data.user);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };
    
    fetchData();
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-[#FAF9F6] pb-16 md:pb-0">
          <div className="p-4 md:p-8 w-full">
            {loading ? (
              <>
                <SkeletonWelcomeBanner />
                <SkeletonQuickActions />
                <div className="w-full h-[300px] bg-gray-100 rounded-2xl mb-8 animate-pulse" />
                
                {/* Desktop: Grid layout Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <div className="lg:col-span-2">
                  </div>
                  <div className="block">
                    <SkeletonWeatherWidget />
                  </div>
                </div>
              </>
            ) : (
              <>
                <WelcomeBanner 
                  userName={`${user?.user_metadata?.name || user?.user_metadata?.full_name || ''}`}
                  notificationCount={3}
                  avatarUrl={user?.user_metadata?.avatar_url}
                  email={user?.email}
                />
                <QuickActions />
                
                <TournamentBanner />

                {/* Grid para LastMatchResult y NextMatch con altura igual */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="h-full flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Último partido disputado
                    </h2>
                    <div className="flex-1">
                      <LastMatchResult />
                    </div>
                  </div>
                  <div className="h-full flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Próximo Partido
                    </h2>
                    <div className="flex-1">
                      <NextMatch 
                        date="14 de Julio"
                        opponent="Diaz/Cuevas"
                        location="Club de Pádel Central"
                        time="20:00"
                        category="Categoría Quinta"
                      />
                    </div>
                  </div>
                </div>

                {/* Tabla de posiciones */}
                <div>
                  <LeagueStandings 
                    category={mockLeagueStandings.category}
                    division={mockLeagueStandings.division}
                    standings={mockLeagueStandings.standings}
                  />
                </div>
                   {/* WeatherWidget en una fila completa */}
                   <div className="mb-8 mt-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <WeatherWidget />
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
        <BottomNav />
      </div>
    </SidebarProvider>
  );
}
