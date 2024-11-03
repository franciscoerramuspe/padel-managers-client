'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
          router.push('/login')
          return
        }

        // Verificar si el usuario ya tiene un perfil
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('phone')
          .eq('id', user.id)
          .single()

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile:', profileError)
        }

        // Si no existe el perfil, crearlo
        if (!profile) {
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([
              {
                id: user.id,
                email: user.email,
                full_name: user.user_metadata?.full_name,
                avatar_url: user.user_metadata?.avatar_url,
              }
            ])

          if (insertError) {
            console.error('Error creating profile:', insertError)
          }
        }

        // Redirigir según el estado del perfil
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