'use client';

import Link from 'next/link';

const LoginForm = () => {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
        <input
          type="email"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-blue-200"
          placeholder="Ingresa tu correo electrónico"
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type="password"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-blue-200"
          placeholder="Ingresa tu contraseña"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span className="text-sm text-gray-600">Recordarme</span>
        </label>
        <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-700 font-semibold to-sky-500 text-white py-3 rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default LoginForm;