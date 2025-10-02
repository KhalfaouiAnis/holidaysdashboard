"use client";

import { Label } from "@/components/ui/label";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { DataTable as DataTableNew } from "@/components/data-table/data-table";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { bookingColumns } from "./columns";
import { PAGE_SIZE } from "@/core/constants";
import { useState } from "react";
import { BookingDetailsDrawer } from "./booking-form-drawer";
import useBookings from "@/core/queries/booking/useBookings";

export function DataTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { bookings, isLoading, totalPages } = useBookings({ page })
  const columns = bookingColumns;
  const table = useDataTableInstance({ data: bookings || [], columns, getRowId: (row) => row.id.toString(), pageSize, setPageSize, totalPages, page, setPage });

  return (
    <div className="w-full flex-col justify-start">
      <div className="flex items-center justify-between mb-4">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <BookingDetailsDrawer />
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border mb-4">
        <DataTableNew table={table} columns={columns} isLoading={isLoading} />
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
