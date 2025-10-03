import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";
import { queryKeys } from "@/core/constants";
import { handleStatusUpdate } from "@/hooks/use-booking-logic";
import { getColorByStatus } from "@/lib/booking";
import { queryClient } from "@/providers/query-provider";

export function BookStatus({ status, id }: { status: BookingStatus, id?: string }) {
    if (id && status === "IN_PROGRESS") {
        async function statusAction(value: BookingStatus) {
            await handleStatusUpdate(id!, value)
            queryClient.invalidateQueries({queryKey: queryKeys.BOOKINGS})
        }

        return (
            <Popover>
                <PopoverTrigger asChild>
                    <Badge variant="destructive" className="rounded-full p-2 cursor-pointer">
                        {status?.toLowerCase()}
                    </Badge>
                </PopoverTrigger>
                <PopoverContent className="py-3">
                    <div className="flex items-center justify-around">
                        <Button variant="destructive" onClick={() => statusAction("FAILED")}>
                            Reject
                        </Button>
                        <Button variant="outline" onClick={() => statusAction("ACCEPTED")}>
                            Accept
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        )
    }

    return (
        <div className="w-8">
            <Badge variant="outline" className={`${getColorByStatus(status)} p-2 rounded-full`}>
                {status?.toLowerCase()}
            </Badge>
        </div>
    )
}