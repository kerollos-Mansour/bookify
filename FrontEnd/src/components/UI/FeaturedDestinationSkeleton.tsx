import Skeleton from "./Skeleton";

export default function DestinationCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="w-full h-48" />

      <div className="p-5 space-y-4">
        {/* Title + rating */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24 rounded" />
          <Skeleton className="h-5 w-10 rounded" />
        </div>

        {/* Address */}
        <Skeleton className="h-4 w-40 rounded" />

        {/* Price + button */}
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-6 w-20 rounded" />
          <Skeleton className="h-8 w-24 rounded" />
        </div>
      </div>
    </div>
  );
}
