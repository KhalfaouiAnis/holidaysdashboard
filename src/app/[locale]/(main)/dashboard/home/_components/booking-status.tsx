import { Badge } from "@/components/ui/badge";
import { getColorByStatus } from "@/lib/booking";

export function BookStatus({ status }: { status: BookingStatus }) {
    return (
        <div className="w-8">
            <Badge variant="outline" className={`${getColorByStatus(status)} p-2 rounded-full`}>
                {status?.toLowerCase()}
            </Badge>
        </div>
    )
}