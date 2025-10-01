"use client";

import { Label } from "@/components/ui/label";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { DataTable as DataTableNew } from "@/components/data-table/data-table";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import useProperties from "@/core/queries/property/useProperties";
import { propertyColumns } from "./columns";
import { PAGE_SIZE } from "@/core/constants";
import { useState } from "react";
import { PropertyFormDrawer } from "../property-form-drawer";
import DeletePropertyDialog from "../delete-property-dialog";

export function DataTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { properties, isLoading, totalPages } = useProperties({ page })
  const columns = propertyColumns;
  const table = useDataTableInstance({ data: properties || [], columns, getRowId: (row) => row.id.toString(), pageSize, setPageSize, totalPages, page, setPage });
  const selectedRowIds = Object.keys(table.getSelectedRowModel().rowsById)

  return (
    <div className="w-full flex-col justify-start">
      <div className="flex items-center justify-between mb-4">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <PropertyFormDrawer />
          {
            selectedRowIds.length > 0 && <DeletePropertyDialog
              fullWidth={false}
              outline
              ids={selectedRowIds}
            />
          }
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border mb-4">
        <DataTableNew table={table} columns={columns} isLoading={isLoading} />
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
