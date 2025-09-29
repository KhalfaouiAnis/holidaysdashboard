import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import Image from "next/image";
import { handleDeleteProperty } from "@/hooks/use-property-logic";

export const propertyColumns: ColumnDef<Property>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    enableSorting: false,
  },
  {
    accessorKey: "images",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Images" />,
    cell: ({ row }) => {
      return <div className="flex gap-2">
        {row.original.images.map((url, idx) => (
          <Image key={idx} src={url} alt={`Image ${idx + 1}`} width={32} height={32} className="object-cover rounded-4xl" />
        ))}
      </div>
    },
    enableSorting: false,
  },
  {
    accessorKey: "price_per_night",
    header: ({ column }) => <DataTableColumnHeader column={column} title="$/night" />,
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-red-500 p-2 rounded-full">
          ${row.original.price_per_night}
        </Badge>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "amenities",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-left" column={column} title="Amenitites" />,
    // cell: ({ row }) => (
    //   <form
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
    //         loading: `Saving ${row.original.header}`,
    //         success: "Done",
    //         error: "Error",
    //       });
    //     }}
    //   >
    //     <Label htmlFor={`${row.original.id}-target`} className="sr-only">
    //       Target
    //     </Label>
    //     <Input
    //       className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
    //       defaultValue={row.original.target}
    //       id={`${row.original.id}-target`}
    //     />
    //   </form>
    // ),
    enableSorting: false,
  },
  {
    accessorKey: "country",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-left" column={column} title="Country" />,
    // cell: ({ row }) => (
    //   <form
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
    //         loading: `Saving ${row.original.header}`,
    //         success: "Done",
    //         error: "Error",
    //       });
    //     }}
    //   >
    //     <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
    //       Limit
    //     </Label>
    //     <Input
    //       className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
    //       defaultValue={row.original.limit}
    //       id={`${row.original.id}-limit`}
    //     />
    //   </form>
    // ),
    enableSorting: false,
  },
  {
    accessorKey: "city",
    header: ({ column }) => <DataTableColumnHeader column={column} title="City" />,
    // cell: ({ row }) => {
    //   const isAssigned = row.original.reviewer !== "Assign reviewer";

    //   if (isAssigned) {
    //     return row.original.reviewer;
    //   }

    //   return (
    //     <>
    //       <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
    //         Reviewer
    //       </Label>
    //       <Select>
    //         <SelectTrigger
    //           className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
    //           size="sm"
    //           id={`${row.original.id}-reviewer`}
    //         >
    //           <SelectValue placeholder="Assign reviewer" />
    //         </SelectTrigger>
    //         <SelectContent align="end">
    //           <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
    //           <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
    //         </SelectContent>
    //       </Select>
    //     </>
    //   );
    // },
    enableSorting: false,
  },
  {
    id: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
            <EllipsisVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={async () => await handleDeleteProperty(row.original.id)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];
