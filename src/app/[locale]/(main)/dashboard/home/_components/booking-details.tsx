import { formatCurrency, getInitials } from "@/lib/utils";
import { formatDate } from "date-fns"
import { BookStatus } from "./booking-status";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export function BookingDetails({ booking }: { booking?: Booking }) {
    return (
        <div className="flex-1 p-2">
            <div className="border rounded-lg p-1">
                <h2 className="mb-2 text-xl">Booking:</h2>
                {
                    booking?.check_in && booking.check_out && (
                        <div className="grid grid-cols-2">
                            <p>Check in: {formatDate(booking?.check_in, 'MM-dd, hh:mm a')}</p>
                            <p>Check out: {formatDate(booking?.check_out, 'MM-dd, hh:mm a')}</p>
                        </div>
                    )
                }
                {
                    booking?.total_price && booking.guest_count && (
                        <div className="grid grid-cols-2 mt-2">
                            <p>Total price: {formatCurrency(booking?.total_price)}</p>
                            <p>Guests: {booking?.guest_count}</p>
                        </div>
                    )
                }
                {
                    booking?.status && booking.payment_status && (
                        <div className="grid grid-cols-2 mt-2 gap-y-2">
                            Booking status: <BookStatus status={booking.status} />
                            Payment status: <BookStatus status={booking.payment_status} />
                        </div>
                    )
                }
            </div>
            <div className="border rounded-lg p-1 my-2">
                <h2 className="mb-2 text-xl">Property: {booking?.property.name}</h2>
                <p className="text-muted-foreground">{booking?.property.description}</p>
                <div className="flex items-center">
                    <p className="text-muted-foreground mr-2">{booking?.property.country},</p>
                    <p className="text-muted-foreground mr-2">{booking?.property.city},</p>
                    <p className="text-muted-foreground mr-2">{booking?.property.address}</p>
                </div>
                <div className="flex mt-2">
                    {
                        booking?.property?.images?.map((img, index) => (
                            <Image src={img} alt="Property_image" height={120} width={120} className={`${index % 2 !== 0 ? 'ml-3' : ''} rounded`} />
                        ))
                    }
                </div>
            </div>
            <div className="border rounded-lg p-1 my-2">
                <h2 className="mb-2 text-xl">User:</h2>
                <div className="flex items-center">
                    <Avatar className="size-10 rounded-full">
                        <AvatarImage src={booking?.user.avatar || undefined} alt={booking?.user.name} />
                        <AvatarFallback className="rounded-lg">{getInitials(booking?.user.name || "")}</AvatarFallback>
                    </Avatar>
                    <p className="mx-2">{booking?.user.name},</p>
                    <p className="mx-2">{booking?.user.email}</p>
                </div>
            </div>
        </div>
    );
}
