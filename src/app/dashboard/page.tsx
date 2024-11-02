"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { User } from '@supabase/supabase-js'
import { Activity, Trophy, Users, Calendar } from 'lucide-react'
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar"
import { AppSidebar } from "../../components/app/Sidebar"
import { useToast } from "../../components/ui/use-toast"
import { ToastAction } from "../../components/ui/toast";
import Image from "next/image";
import { MapPin, Star } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { fetchAvailability } from '@/services/courts'

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState({
    totalMatches: 0,
    winRate: 0,
    ranking: 0,
    nextMatch: null
  });
  const { toast } = useToast()
  const [availableCourts, setAvailableCourts] = useState<Court[]>([])

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/login');
      } else if (session?.user) {
        setUser(session.user);
      }
    });

    // Fetch available courts when component mounts
    const fetchCourts = async () => {
      const courts = await fetchAvailability(new Date())
      setAvailableCourts(courts)
    }
    
    fetchCourts()

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleReservation = () => {
    toast({
      title: "¡Reserva Exitosa!",
      description: "Tu reserva ha sido procesada correctamente. 01/12/2024 - 10:00 hs.",
      action: (
        <ToastAction 
          altText="Ver mis reservas" 
          onClick={() => router.push('/bookings')}
        >
          Ver mis reservas
        </ToastAction>
      ),
      duration: 5000,
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <SidebarTrigger className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Trophy className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Total Partidos</p>
                    <p className="text-2xl font-semibold">{stats.totalMatches}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Activity className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">% Victoria</p>
                    <p className="text-2xl font-semibold">{stats.winRate}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Users className="h-6 w-6 text-purple-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Ranking</p>
                    <p className="text-2xl font-semibold">#{stats.ranking}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Calendar className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Próximo Partido</p>
                    <p className="text-2xl font-semibold">
                      {stats.nextMatch || 'No agendado'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Canchas Disponibles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableCourts.map((court) => (
                  <div
                    key={court.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative h-48">
                      <Image
                        src="/assets/images.jpg"
                        alt={court.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <span className="bg-white backdrop-blur-sm text-black px-3 py-1 rounded-full text-sm font-medium">
                          2 vs 2
                        </span>
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Abierta
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">{court.name}</h3>
                          <div className="flex items-center gap-2 text-gray-500">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">Paysandu, Uruguay</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1 text-yellow-500 mb-1">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="font-medium">4.85</span>
                          </div>
                          <span className="text-xs text-gray-500">100 reseñas</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => router.push('/book')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Reservar Ahora
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
