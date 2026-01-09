import Skeleton from "./Skeleton";

export default function DestinationCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-100 dark:border-white/5 overflow-hidden">
      {/* Image skeleton - h-44 */}
      <Skeleton className="w-full h-44" />

      <div className="p-4 space-y-4">
        {/* Title + rating */}
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-5 w-2/3 rounded-lg" />
          <Skeleton className="h-5 w-10 rounded-lg" />
        </div>

        {/* Address */}
        <Skeleton className="h-3 w-1/2 rounded-lg" />

        {/* Price + button */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5">
          <div className="space-y-1">
            <Skeleton className="h-5 w-16 rounded" />
          </div>
          <Skeleton className="h-8 w-20 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
