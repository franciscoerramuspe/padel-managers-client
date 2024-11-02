"use client"

import React from "react"
import { Calendar, Home, CircleUser, LandPlot, LogOut, ChevronsUpDown, UserCog } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" 
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Image from "next/image"

const menuItems = [
  {
    title: "Inicio",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Mis Reservas",
    url: "/bookings",
    icon: Calendar,
  },
  {
    title: "Canchas disponibles",
    url: "/courts",
    icon: LandPlot,
  },
]

export function AppSidebar() {
  const router = useRouter()
  const [userEmail, setUserEmail] = React.useState<string | null>(null)

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserEmail(session?.user?.email ?? null)
    })
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo_padel_manager.png"
            alt="Logo"
            width={40}
            height={40}
          />
          <span className="font-semibold text-lg">Padel Manager</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{userEmail?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {userEmail || 'Usuario'}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                className="w-[--radix-dropdown-menu-trigger-width]"
              >
                  <DropdownMenuItem>
                  <CircleUser className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserCog className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem>
                 <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
} 