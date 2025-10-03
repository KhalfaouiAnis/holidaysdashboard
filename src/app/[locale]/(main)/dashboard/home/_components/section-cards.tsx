"use client"

import { Loader2 } from "lucide-react";
import useBookingStats from "@/core/queries/booking/useBookingStats";
import { StatsCard } from "./stats-card";

export function SectionCards() {
  const { stats, isLoading } = useBookingStats()

  if (isLoading) return <Loader2 className="text-primary animate-spin text-center" width={120} height={120} />

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <StatsCard title="Total Revenue" totalRevenue={stats?.totalRevenue} />
      <StatsCard title="Total Bookings" totalBookings={stats?.totalBookings} />
      <StatsCard title="Accepted Bookings" ACCEPTED={stats?.statusCounts.ACCEPTED} />
      <StatsCard title="Rejected Bookings" FAILED={stats?.statusCounts.FAILED} />
    </div>
  );
}
