import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookingDetails } from "./booking-details";

export function BookingDetailsDrawer({ booking }: { booking?: Booking }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {booking?.property?.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent style={{ maxWidth: '40vw', padding: 2 }}>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Booking details</DrawerTitle>
          <DrawerDescription>Find below the details of this booking, the property and the booking user.</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[80vh] w-full rounded-lg border p-1">
          <BookingDetails booking={booking} />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
