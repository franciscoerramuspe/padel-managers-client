import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import BackButton from "@/components/auth/BackButton";


export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="flex w-full max-w-[1200px] h-[600px] bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden m-2 hover:shadow-blue-200/50 transition-all duration-500 border border-white/20">
        {/* Left Section - Form */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="max-w-[400px] mx-auto">
            <div className="mb-8">
            <BackButton />
            </div>
            
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h1 className="text-2xl font-semibold mb-2 text-gray-700">¿Olvidaste tu contraseña?</h1>
              <p className="text-gray-600 text-sm">
                No te preocupes, te enviaremos instrucciones para restablecerla
              </p>
            </div>

            <ForgotPasswordForm />
          </div>
        </div>

        {/* Right Section - Video Banner */}
        <div className="hidden lg:block w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/90 mix-blend-multiply"></div>
          <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
            <source src="/assets/intro.mp4" type="video/mp4" />
          </video>
          <div className="relative z-10 p-12 h-full flex flex-col justify-center items-center text-center">
            <div className="space-y-4 max-w-md">
              <h2 className="text-3xl font-bold text-white">
                Recupera el acceso a tu cuenta
              </h2>
              <p className="text-white/90">
                Sigue los pasos para restablecer tu contraseña y volver a gestionar tus reservas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}