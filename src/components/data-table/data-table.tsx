import { ColumnDef, flexRender, type Table as TanStackTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  table: TanStackTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  isLoading?: boolean;
}

function renderTableBody<TData, TValue>({
  table,
  columns,
  isLoading
}: {
  table: TanStackTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  isLoading?: boolean
}) {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          {/* <Loader2 className="h-8 w-8 animate-spin text-center" /> */}
          Loading...
        </TableCell>
      </TableRow>
    );
  }
  if (!table.getRowModel().rows.length) {
    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    );
  }
  return table.getRowModel().rows.map((row) => (
    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
      ))}
    </TableRow>
  ));
}

export function DataTable<TData, TValue>({
  table,
  columns,
  isLoading
}: DataTableProps<TData, TValue>) {

  const tableContent = (
    <Table>
      <TableHeader className="bg-muted sticky top-0 z-10">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="**:data-[slot=table-cell]:first:w-8">
        {renderTableBody({ table, columns, isLoading })}
      </TableBody>
    </Table>
  );

  return tableContent;
}
