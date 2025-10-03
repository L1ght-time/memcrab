import { DataTable } from "~/views/components/data-table/data-table";
import { DataTableProvider } from "~/views/components/data-table/providers/data-table-provider";

type DataTableWithProviderProps = {
  rows: number;
  cols: number;
  setTableSize: React.Dispatch<
    React.SetStateAction<null | { rows: string; cols: string }>
  >;
  setStep: React.Dispatch<React.SetStateAction<"setup" | "table">>;
};

export const DataTableWithProvider = (props: DataTableWithProviderProps) => (
  <DataTableProvider {...props}>
    <DataTable />
  </DataTableProvider>
);
