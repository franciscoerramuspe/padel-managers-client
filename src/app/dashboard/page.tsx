"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { CourtsGrid } from "@/components/dashboard/CourtsGrid";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/Sidebar";
import { fetchAvailability } from '@/services/courts';
import { Court } from "@/types";
import { Button } from "@/components/ui/button";
import { NextMatch } from "@/components/dashboard/NextMatch";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget"; 
import { supabase } from '@/lib/supabase';
import { User } from "@supabase/supabase-js";
import { BottomNav } from "@/components/navigation/BottomNav";
import { CourtsCarousel } from "@/components/dashboard/CourtsCarousel";
import { SkeletonWelcomeBanner } from "@/components/dashboard/skeletons/SkeletonWelcomeBanner";
import { SkeletonQuickActions } from "@/components/dashboard/skeletons/SkeletonQuickActions";
import { SkeletonCourtsCarousel } from "@/components/dashboard/skeletons/SkeletonCourtsCarousel";
import { SkeletonNextMatch } from "@/components/dashboard/skeletons/SkeletonNextMatch";
import { SkeletonWeatherWidget } from "@/components/dashboard/skeletons/SkeletonWeatherWidget";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCourtsGrid } from "@/components/dashboard/skeletons/SkeletonCourtsGrid";
import { ClockWidget } from "@/components/dashboard/ClockWidget";
import { TournamentBanner } from "@/components/dashboard/TournamentBanner"

export default function DashboardPage() {
  const router = useRouter();
  const [availableCourts, setAvailableCourts] = useState<Court[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courtsData, userData] = await Promise.all([
          fetchAvailability(new Date()),
          supabase.auth.getUser()
        ]);
        
        setAvailableCourts(courtsData);
        if (userData.data.user) {
          setUser(userData.data.user);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setTimeout(() => setLoading(false), 1000); // Añadimos un pequeño delay para mejor UX
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
                
                {/* Desktop: Canchas Disponibles Skeleton */}
                <div className="hidden lg:block mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                  <SkeletonCourtsGrid />
                </div>

                {/* Mobile: Canchas Disponibles Skeleton */}
                <div className="mb-8 lg:hidden">
                  <div className="flex items-center justify-between mb-6">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                  <SkeletonCourtsCarousel />
                </div>

                {/* Desktop: Grid layout Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <div className="lg:col-span-2">
                    <SkeletonNextMatch />
                  </div>
                  <div className="block">
                    <SkeletonWeatherWidget />
                  </div>
                </div>
              </>
            ) : (
              <>
                <WelcomeBanner 
                  userName={user?.user_metadata?.name || user?.user_metadata?.full_name || ''} 
                  notificationCount={3}
                  avatarUrl={user?.user_metadata?.avatar_url}
                  email={user?.email}
                />
                <QuickActions />
                
                <TournamentBanner />
                
                {/* Desktop: Canchas Disponibles */}
                <div className="hidden lg:block mb-8">
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

                {/* Mobile: Canchas Disponibles */}
                <div className="mb-8 lg:hidden">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Canchas Disponibles</h2>
                    <Button variant="outline" onClick={() => router.push('/book')}>
                      Ver todas
                    </Button>
                  </div>
                  <CourtsCarousel
                    courts={availableCourts} 
                    onCourtSelect={(courtId) => router.push(`/courts/${courtId}`)}
                  />
                </div>

                {/* Desktop: Grid layout con NextMatch y WeatherWidget */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <div className="lg:col-span-2">
                    <NextMatch
                      userId={user?.id}
                      onViewCalendar={() => router.push('/my-bookings?userId=' + user?.id)}
                    />
                  </div>
                  <div className="block">
                    <div className="bg-white rounded-xl shadow-sm p-6 h-full space-y-6">
                      <WeatherWidget />
                      <div className="border-t pt-6">
                        <ClockWidget />
                      </div>
                    </div>
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
