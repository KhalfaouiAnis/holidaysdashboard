"use client";

import { PAGE_SIZE, queryKeys } from "@/core/constants";
import { listBookings } from "@/server/booking/booking-actions";
import { useQuery } from "@tanstack/react-query";

type BookingOptions = {
  page: number;
  pageSize?: number;
};

const useBookings = ({ page, pageSize }: BookingOptions) => {
  const { data, status, isRefetching, isLoading, isPending, error, refetch } = useQuery<PagedResult<Booking>>({
    queryKey: [...queryKeys.USERS, page],
    queryFn: () =>
      listBookings({
        page,
        pageSize: pageSize || PAGE_SIZE,
      }),
  });

  return {
    bookings: data?.data ?? [],
    page: data?.page,
    pageSize: data?.pageSize,
    totalCount: data?.totalCount,
    totalPages: data?.totalPages,
    isLoading,
    status,
    error,
    isPending,
    isRefetching,
    refetch,
  };
};

export default useBookings;
