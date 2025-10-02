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
import { PropertyFormDrawer } from "../property-form-drawer";
import DeletePropertyDialog from "../delete-property-dialog";

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
        {row.original.images?.map((url, idx) => (
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
      <div className="w-8">
        <Badge variant="outline" className="text-green-500 p-2 rounded-full">
          ${row.original.price_per_night}
        </Badge>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "amenities",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-left" column={column} title="Amenitites" />,
    cell: ({ row }) => (
        <Badge variant="outline" className="text-violet-500 p-2 rounded-full">
          {row.original.amenities}
        </Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "country",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-left" column={column} title="Country" />,
    enableSorting: false,
  },
  {
    accessorKey: "city",
    header: ({ column }) => <DataTableColumnHeader column={column} title="City" />,
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
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild onSelect={() => { }}>
            <PropertyFormDrawer property={row.original} />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <DeletePropertyDialog
              id={row.original.id}
              propertyName={row.original.name}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];
