import Image from "next/image";
import GoogleButton from "@/components/GoogleButton";
import LoginForm from "@/components/auth/LoginForm";


export default function LoginPage() {
  return (
    <div className="min-h-screen min-w-full flex items-center justify-center bg-gradient-to-br from-blue-300 to-sky-50 p-4">
      <div className="flex w-full max-w-[1200px] h-auto lg:h-[700px] bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden hover:shadow-blue-200/50 transition-all duration-500 border border-white/50">
        {/* Left Section - Login Form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12">
          {/* Logo para mobile */}
          <div className="flex justify-center mb-8 lg:hidden">
            <div className="relative w-32 h-12">
              <Image
                src="/assets/logo_padel_manager.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="max-w-[400px] mx-auto space-y-10">
            <div className="space-y-3">
              <h1 className="text-2xl font-semibold text-gray-700">
                Iniciar sesión para continuar
              </h1>
              <p className="text-gray-600 text-sm">
                Reserva y gestiona tus partidos de pádel de manera eficiente
              </p>
            </div>

            {/* Google Button */}
            <div>
              <GoogleButton />
            </div>

            {/* Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/60 backdrop-blur-sm rounded-lg text-gray-500">
                  o continúa con email
                </span>
              </div>
            </div>

            {/* Login Form */}
            <div className="space-y-6">
              <LoginForm />
            </div>
            
            {/* Footer */}
            <div className="pt-8">
              <p className="text-center text-xs text-gray-500">
                ©2024 Padel Managers. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Video Banner */}
        <div className="hidden lg:block w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/90 mix-blend-multiply"></div>
          <video 
            autoPlay 
            muted 
            loop 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          >
            <source src="/assets/intro.mp4" type="video/mp4" />
          </video>
          <div className="relative z-10 p-12 h-full flex flex-col justify-between">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-white">
                Bienvenido a Padel Managers 
              </h2>
            </div>
            <div className="flex justify-end">
              <div className="w-32 h-32 relative">
                <Image
                  src="/assets/logo_padel_manager.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}