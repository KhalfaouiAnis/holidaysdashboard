import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { BookingDetailsDrawer } from "./booking-form-drawer";
import { BookStatus } from "./booking-status";
import { formatCurrency } from "@/lib/utils";

export const bookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: "property.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Property name" />,
    cell: ({ row }) => <BookingDetailsDrawer booking={row.original} />,
    enableSorting: false,
  },
  {
    accessorKey: "user.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="User" />,
    enableSorting: false,
  },
  {
    accessorKey: "total_price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total price" />,
    cell: ({ row }) => (
      <div className="w-8">
        <Badge variant="outline" className="text-green-500 p-2 rounded-full">
          {formatCurrency(row.original.total_price)}
        </Badge>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "guest_count",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Guests" />,
    enableSorting: false,
  },
  {
    accessorKey: "property.country",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />,
    enableSorting: false,
  },
  {
    accessorKey: "property.city",
    header: ({ column }) => <DataTableColumnHeader column={column} title="City" />,
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <BookStatus status={row.original.status} id={row.original.id} />,
    enableSorting: false,
  },
  {
    accessorKey: "payment_status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payment status" />,
    cell: ({ row }) => <BookStatus status={row.original.payment_status} />,
    enableSorting: false,
  }
];
