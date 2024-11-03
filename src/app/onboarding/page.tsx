'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingSlide } from '@/components/onboarding/OnboardingSlide';
import { PhoneForm } from '@/components/onboarding/PhoneForm';
import { Button } from '@/components/ui/button';

const slides = [
  {
    title: "Encuentra tu Cancha Perfecta",
    subtitle: "Descubre las mejores canchas de pádel cerca de ti",
    imagePath: "/assets/welcome.png",
    highlightWord: "Perfecta",
    titleColor: "blue"
  },
  {
    title: "Reserva en Segundos",
    subtitle: "Proceso simple y rápido para asegurar tu horario ideal",
    imagePath: "/assets/step2.png",
    highlightWord: "Segundos",
    titleColor: "orange"
  },
  {
    title: "Juega con Amigos",
    subtitle: "Organiza partidos y comparte tus reservas fácilmente",
    imagePath: "/assets/step3.png",
    highlightWord: "Amigos",
    titleColor: "green"
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [user, setUser] = useState(null);

  // Keep your existing useEffect for auth check
  useEffect(() => {
    const checkProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
    };

    checkProfile();
  }, [router]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      setShowPhoneForm(true);
    }
  };

  const handleSkip = () => {
    setShowPhoneForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl" />
        <div className="absolute -bottom-8 right-0 w-96 h-96 bg-white/10 rounded-full mix-blend-multiply filter blur-xl" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {!showPhoneForm ? (
              <div className="h-[600px] bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden">
                <div className="h-full flex flex-col">
                  <div className="flex-1 relative">
                    {slides.map((slide, index) => (
                      <OnboardingSlide
                        key={index}
                        {...slide}
                        isActive={currentSlide === index}
                      />
                    ))}
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <div className="flex justify-center space-x-2">
                      {slides.map((_, index) => (
                        <motion.div
                          key={index}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            currentSlide === index 
                              ? 'bg-white w-8' 
                              : 'bg-white/40 w-2'
                          }`}
                          animate={{
                            scale: currentSlide === index ? 1.2 : 1
                          }}
                        />
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Button
                        variant="ghost"
                        onClick={handleSkip}
                        className="text-white hover:text-white/80"
                      >
                        Saltar
                      </Button>
                      
                      <Button
                        onClick={handleNext}
                        className="bg-white text-blue-600 hover:bg-white/90 px-8"
                      >
                        {currentSlide === slides.length - 1 ? '¡Comenzar!' : 'Siguiente'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-3xl shadow-xl"
              >
                <PhoneForm user={user} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}