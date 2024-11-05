export function BookingCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse">
      <div className="flex gap-4">
        {/* Date Skeleton */}
        <div className="flex flex-col items-center min-w-[60px]">
          <div className="h-4 w-12 bg-gray-200 rounded mb-1" />
          <div className="h-8 w-8 bg-gray-200 rounded mb-1" />
          <div className="h-4 w-12 bg-gray-200 rounded" />
        </div>

        <div className="flex-1">
          {/* Time and location Skeleton */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded" />
              <div className="h-6 w-48 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Status Skeleton */}
          <div className="mt-3 flex items-center gap-3">
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
            <div className="h-8 w-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
} 