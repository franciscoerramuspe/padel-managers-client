'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppSidebar } from "@/components/app/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";

interface Profile {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  created_at: string;
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [phone, setPhone] = useState("");
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      setUser(user);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) throw error;
      setProfile(profile);
      setPhone(profile?.phone || "");
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePhone = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ phone })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: "Teléfono actualizado",
        description: "El número de teléfono ha sido actualizado correctamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el teléfono.",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Error",
        description: "Las contraseñas nuevas no coinciden.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.new
      });

      if (error) throw error;

      setPasswords({ current: "", new: "", confirm: "" });
      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada correctamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar la contraseña.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProfile = async () => {
    try {
      // Actualizar teléfono
      const { error: phoneError } = await supabase
        .from('profiles')
        .update({ phone })
        .eq('id', user?.id);

      if (phoneError) throw phoneError;

      // Actualizar contraseña si se proporcionó una nueva
      if (passwords.new && passwords.new === passwords.confirm) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: passwords.new
        });

        if (passwordError) throw passwordError;
        setPasswords({ current: "", new: "", confirm: "" });
      }

      toast({
        title: "Perfil actualizado",
        description: "Los cambios han sido guardados correctamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios.",
        variant: "destructive",
      });
    }
  };

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
        <main className="flex-1 bg-gray-50">
          <div className="w-full h-full">
            <div className="w-full bg-white min-h-screen p-6 md:p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold">Perfil de Usuario</h2>
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => getProfileData()}>Cancelar</Button>
                  <Button onClick={handleUpdateProfile}>Guardar cambios</Button>
                </div>
              </div>

              <div className="max-w-5xl mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-6">Información Pública</h3>
                  <div className="flex items-start gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user?.user_metadata?.avatar_url} />
                      <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <p className="text-base font-medium">Foto de perfil</p>
                      <p className="text-sm text-gray-500">Esta foto será visible para otros usuarios</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-700 mb-6">Información Personal</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-medium">Nombre completo</label>
                        <Input 
                          value={profile?.full_name || user?.user_metadata?.full_name || ""} 
                          disabled 
                          className="mt-1 bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input 
                          value={user?.email || ""} 
                          disabled 
                          className="mt-1 bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Teléfono</label>
                        <Input 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Ingresa tu teléfono"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-700 mb-6">Seguridad</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-medium">Nueva contraseña</label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={passwords.new}
                            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                            className="mt-1"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Confirmar contraseña</label>
                        <Input
                          type="password"
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
} 