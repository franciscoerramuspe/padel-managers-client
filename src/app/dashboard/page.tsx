"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { CourtsGrid } from "@/components/dashboard/CourtsGrid";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/Sidebar";
import { fetchAvailability } from '@/services/courts';
import { Court } from "@/types";
import { Button } from "@/components/ui/button";
import { Trophy, Activity, Users, Calendar } from 'lucide-react';
import { NextMatch } from "@/components/dashboard/NextMatch";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget"; 
import { supabase } from '@/lib/supabase';
import { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const router = useRouter();
  const [availableCourts, setAvailableCourts] = useState<Court[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchCourts = async () => {
      const courts = await fetchAvailability(new Date());
      setAvailableCourts(courts);
    };
    
    fetchCourts();
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-4 md:p-8 w-full">
            <WelcomeBanner userName={user?.user_metadata?.name || user?.user_metadata?.full_name || ''} notificationCount={3} />
            
            <QuickActions />
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
              <StatsCard
                title="Total Reservas"
                value="24"
                icon={Trophy}
                trend={{ value: 12, isPositive: true }}
              />
              <StatsCard
                title="Tasa de Victoria"
                value="68%"
                icon={Activity}
              />
              <StatsCard
                title="Ranking"
                value="#42"
                icon={Users}
              />
              <StatsCard
                title="Próximo Partido"
                value="2"
                icon={Calendar}
                description="días restantes"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <NextMatch
                  userId={user?.id}
                  onViewCalendar={() => router.push('/my-bookings?userId=' + user?.id)}
                />
              </div>
              <div className="hidden lg:block">
                <WeatherWidget />
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Canchas Disponibles</h2>
                <Button variant="outline" onClick={() => router.push('/book')}>
                  Ver todas
                </Button>
              </div>
              <CourtsGrid
                courts={availableCourts}
                onCourtSelect={(courtId) => router.push(`/courts/${courtId}`)}
              />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
