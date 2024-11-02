"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { User } from '@supabase/supabase-js'
import { Activity, Trophy, Users, Calendar } from 'lucide-react'
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar"
import { AppSidebar } from "../../components/app/Sidebar"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast";

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
            <button
              onClick={handleReservation}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reservar
            </button>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
