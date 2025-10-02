import { DataTable } from "./_components/data-table";
import { SectionCards } from "./_components/section-cards";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <SectionCards />
      <DataTable />
    </div>
  );
}
