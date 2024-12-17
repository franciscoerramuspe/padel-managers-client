import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryColor(category: string) {
  const categoryColors: { [key: string]: string } = {
    "Primera": "border-blue-200 text-blue-700 bg-blue-50",
    "Segunda": "border-green-200 text-green-700 bg-green-50",
    "Tercera": "border-purple-200 text-purple-700 bg-purple-50",
    "Cuarta": "border-orange-200 text-orange-700 bg-orange-50",
    "Quinta": "border-red-200 text-red-700 bg-red-50",
    "Sexta": "border-teal-200 text-teal-700 bg-teal-50",
    "Septima": "border-indigo-200 text-indigo-700 bg-indigo-50",
    "Octava": "border-pink-200 text-pink-700 bg-pink-50",
  }

  return categoryColors[category] || "border-gray-200 text-gray-700 bg-gray-50"
}
