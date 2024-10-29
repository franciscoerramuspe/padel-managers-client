'use client';

import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.push('/login')}
      className="text-blue-600 font-medium hover:text-blue-800 text-sm flex items-center gap-2 group"
    >
      <svg 
        className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M15 19l-7-7 7-7" 
        />
      </svg>
      Volver al inicio
    </button>
  );
};

export default BackButton;