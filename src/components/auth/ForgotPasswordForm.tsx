'use client';

import { useState } from 'react';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí implementaremos la lógica de recuperación con Supabase
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Correo electrónico
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-blue-200"
          placeholder="Ingresa tu correo electrónico"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-700 to-sky-500 text-white py-3 rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg font-semibold"
      >
        Enviar instrucciones
      </button>
    </form>
  );
};

export default ForgotPasswordForm;