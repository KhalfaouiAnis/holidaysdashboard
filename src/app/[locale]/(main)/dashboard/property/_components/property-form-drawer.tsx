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
import { PropertyForm } from "./property-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Plus } from "lucide-react";

export function PropertyFormDrawer({ property }: { property?: Property }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant={property ? "ghost" : "outline"} size="sm" className={property ? "w-full" : ""}>
          {
            property ? <Edit /> : (
              <>
                <Plus />
                <span className="hidden lg:inline">Add</span>
              </>
            )
          }
        </Button>
      </DrawerTrigger>
      <DrawerContent style={{ maxWidth: '40vw', padding: '1' }}>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{property ? property.name : "New property"}</DrawerTitle>
          <DrawerDescription>{property ? 'Update property' : 'Create a new property'}</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[80vh] w-full rounded-lg border p-4">
          <PropertyForm property={property} />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
