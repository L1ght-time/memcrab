import { DataTable } from "~/views/components/data-table/data-table";
import { DataTableProvider } from "~/views/components/data-table/providers/data-table-provider";

type DataTableWithProviderProps = {
  rows: number;
  cols: number;
  setTableSize: React.Dispatch<
    React.SetStateAction<null | { rows: string; cols: string }>
  >;
};

export const DataTableWithProvider = (props: DataTableWithProviderProps) => {
  const { rows, cols, setTableSize } = props;

  return (
    <DataTableProvider rows={rows} cols={cols} setTableSize={setTableSize}>
      <DataTable />
    </DataTableProvider>
  );
};
