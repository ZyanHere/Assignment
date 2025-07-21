"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function StoreSkeleton() {

    return (
        <div className="pl-12 pr-12 pb-12 mx-auto w-full max-w-[1700px]">
            {/* Breadcrumb */}
            <div className="mt-8 mb-8">
                <Skeleton className="h-8 w-[200px]" />
            </div>

            {/* Banner */}
            <div className="relative w-full aspect-[3/1] rounded-xl overflow-hidden mb-10">
                <Skeleton className="w-full h-full rounded-xl" />
            </div>

            {/* Promo */}
            <div className="my-10">
                <Skeleton className="w-[1500px] h-[340px] mx-auto rounded-xl" />
            </div>

            {/* Category Section Title */}
            <div className="mb-6">
                <Skeleton className="h-6 w-64 mb-4" />
            </div>

            {/* Product Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className="p-4 rounded-xl border shadow-sm flex flex-col gap-3"
                    >
                        <Skeleton className="w-full h-[180px] rounded-lg" />
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        </div>
    );
}
