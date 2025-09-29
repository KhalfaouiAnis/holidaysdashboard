import {
  ColumnDef,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useState } from "react";

type UseDataTableInstanceProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  enableRowSelection?: boolean;
  getRowId?: (row: TData, index: number) => string;
  totalPages?: number;
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  defaultPageIndex?: number;
  defaultPageSize?: number;
  pageSize: number;
  manualPagination?: boolean;
};

export function useDataTableInstance<TData, TValue>({
  data,
  columns,
  enableRowSelection = true,
  getRowId,
  pageSize,
  setPage,
  page,
  totalPages,
  manualPagination = true,
}: UseDataTableInstanceProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    manualPagination,
    pageCount: totalPages || 1,
    state: {
      rowSelection,
      pagination: {
        pageIndex: page - 1,
        pageSize,
      },
    },
    enableRowSelection,
    getRowId: getRowId ?? ((row) => (row as any).id.toString()),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      const newState = typeof updater === "function" ? updater(table.getState().pagination) : updater;
      setPage(newState.pageIndex + 1);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return table;
}
