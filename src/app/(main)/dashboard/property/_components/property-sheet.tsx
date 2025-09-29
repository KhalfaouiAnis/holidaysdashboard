import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Plus } from "lucide-react"
import { PropertyForm } from "./property-form"
import { ScrollArea } from "@/components/ui/scroll-area"

export function PropertySheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                    <Plus />
                    <span className="hidden lg:inline">Add</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[40%] sm:max-w-none">
                <SheetHeader>
                    <SheetTitle>Add property</SheetTitle>
                    <SheetDescription>
                        Please fill in the form below. Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[80vh] w-full rounded-md border p-4">
                    <PropertyForm />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
