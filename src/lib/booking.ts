export function getColorByStatus(status: BookingStatus) {
  switch (status) {
    case "IN_PROGRESS":
      return "text-zinc-500";
    case "ACCEPTED":
    case "SUCCEEDED":
    case "COMPLETED":
      return "text-green-500";
    case "CANCELED":
    case "FAILED":
      return "text-red-500";
    default:
      return "text-zinc-500";
  }
}
