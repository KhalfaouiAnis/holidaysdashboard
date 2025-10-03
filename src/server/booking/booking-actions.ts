"use server";

import { client } from "@/core/api/client";

export const updateBookingStatus = async (id: string, newStatus: BookingStatus) => {
  await client.patch(`/bookings/${id}/status/${newStatus}`);
};

export const listBookings = async (options: PaginationParams): Promise<PagedResult<Booking>> => {
  const { page, pageSize } = options;
  const { data } = await client.get(`/bookings?page=${page}&pageSize=${pageSize}`);
  return data;
};

export const bookingStats = async () => {
  const { data } = await client.get("/bookings/stats");
  return data;
};
