import { handleClientError } from "@/lib/utils";
import { bookingStats, updateBookingStatus } from "@/server/booking/booking-actions";

export async function handleStatusUpdate(id: string, status: BookingStatus) {
  try {
    await updateBookingStatus(id, status);
  } catch (error) {
    handleClientError(error);
  }
}

export async function handleFetchBookingStats() {
  try {
    const data: BookingStats = await bookingStats();
    const totalBookings = data.reduce((acc, group) => acc + group._count.id, 0);
    const totalRevenue = data.reduce((acc, group) => acc + (group._sum?.total_price || 0), 0);
    const statusCounts = data.reduce(
      (acc, group) => {
        acc[group.status] = group._count.id;
        return acc;
      },
      {} as Record<BookingStatus, number>,
    );
    return {
      totalRevenue,
      totalBookings,
      statusCounts,
    };
  } catch (error) {
    handleClientError(error);
  }
}
