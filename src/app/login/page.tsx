import Image from "next/image";
import GoogleButton from "@/components/GoogleButton";
import LoginForm from "@/components/auth/LoginForm";


export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-sky-50">
      <div className="flex w-full max-w-[1200px] h-[600px] bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden m-2 hover:shadow-blue-200/50 transition-all duration-500 border border-white/50">
        {/* Left Section - Login Form */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="max-w-[400px] mx-auto">
            <h1 className="text-2xl font-semibold mb-2 flex items-center bg-clip-text text-gray-700">
              Iniciar sesión para continuar
            </h1>
            <p className="text-gray-600 text-sm mb-8">Reserva y gestiona tus partidos de pádel de manera eficiente</p>

            <div className="transform hover:scale-[1.01] transition-all duration-300">
              <GoogleButton />
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white border-2 border-gray-100 rounded-lg text-gray-500">o continúa con email</span>
              </div>
            </div>
            <LoginForm />
            <p className="text-center text-xs text-gray-500 mt-4">
              ©2024 Padel Managers. Todos los derechos reservados.
            </p>
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
              <div className="w-32 h-32 relative animate-float">
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
  );
}