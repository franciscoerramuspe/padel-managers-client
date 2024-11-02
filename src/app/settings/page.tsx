'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Shield, Smartphone, Moon } from 'lucide-react';
import { SidebarProvider } from "@/components/app/SidebarContext"; 
import { AppSidebar }    from "@/components/app/Sidebar";
    

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false
  });

  const [darkMode, setDarkMode] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="max-w-4xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
            
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-blue-500" />
                    <CardTitle>Notificaciones</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-medium">Notificaciones por email</h3>
                      <p className="text-sm text-gray-500">Recibe actualizaciones sobre tus reservas</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications(prev => ({...prev, email: checked}))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-medium">Notificaciones push</h3>
                      <p className="text-sm text-gray-500">Recibe notificaciones en tu dispositivo</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications(prev => ({...prev, push: checked}))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    <CardTitle>Privacidad</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-medium">Modo oscuro</h3>
                      <p className="text-sm text-gray-500">Cambia el tema de la aplicación</p>
                    </div>
                    <Switch
                      checked={darkMode}
                      onCheckedChange={(checked) => setDarkMode(checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
} 