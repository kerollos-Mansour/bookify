import Skeleton from "./Skeleton";

export default function DestinationCardSkeleton() {
  return (
    <article className="shrink-0 w-72 sm:w-80 md:w-96 bg-white rounded-xl md:rounded-2xl overflow-hidden border border-gray-200 snap-start">
      {/* Image skeleton */}
      <Skeleton className="w-full aspect-video" />

      <div className="p-4 md:p-6 space-y-3">
        <Skeleton className="h-5 w-40 rounded" />  {/* Title */}
        <Skeleton className="h-4 w-32 rounded" />  {/* Location */}
        <Skeleton className="h-6 w-24 rounded" />  {/* Price */}
      </div>
    </article>
  );
}
