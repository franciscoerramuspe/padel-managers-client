'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        // Obtener usuario actual
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
          router.push('/login')
          return
        }

        // Verificar si el usuario ya tiene un perfil con teléfono
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('phone')
          .eq('id', user.id)
          .single()

        if (profileError) {
          console.error('Error fetching profile:', profileError)
        }

        // Si el usuario tiene un perfil con teléfono, ir al dashboard
        // Si no, ir al onboarding
        if (profile?.phone) {
          router.push('/dashboard')
        } else {
          router.push('/onboarding')
        }
      } catch (error) {
        console.error('Error in auth callback:', error)
        router.push('/login')
      }
    }

    checkUserProfile()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
} 