export function SkeletonClockWidget() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="flex items-center justify-center flex-col">
        <div className="h-12 w-12 bg-gray-200 rounded-full mb-3"></div>
        <div className="h-8 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
} 