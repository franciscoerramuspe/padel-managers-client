import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCourtsCarousel() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <Skeleton className="h-64 w-full" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-4 w-48 mb-4" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
} 