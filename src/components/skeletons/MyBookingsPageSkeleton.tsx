import { BookingCardSkeleton } from "./BookingCardSkeleton";

export function MyBookingsPageSkeleton() {
  return (
    <div className="flex min-h-screen w-full">
      <main className="flex-1">
        <div className="flex flex-col h-full">
          <div className="flex-1 space-y-4 p-8 pt-6 pb-24 md:pb-8">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="relative w-64">
                <div className="h-10 bg-gray-200 rounded-lg w-full" />
              </div>
              <div className="flex gap-2">
                <div className="h-10 w-24 bg-gray-200 rounded-lg" />
                <div className="h-10 w-24 bg-gray-200 rounded-lg" />
              </div>
            </div>
            
            {/* Booking Cards Skeleton */}
            <div className="grid gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <BookingCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 