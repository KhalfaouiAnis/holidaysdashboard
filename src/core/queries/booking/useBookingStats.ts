"use client";

import { queryKeys } from "@/core/constants";
import { handleFetchBookingStats } from "@/hooks/use-booking-logic";
import { useQuery } from "@tanstack/react-query";

const useBookingStats = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [...queryKeys.BOOKING_STATS],
    queryFn: () => handleFetchBookingStats(),
  });

  return {
    stats: data,
    isLoading,
    error,
  };
};

export default useBookingStats;
