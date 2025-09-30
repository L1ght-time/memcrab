import { useState } from "react";
import { DataTable } from "~/views/components/data-table/data-table";
import { DataTableProvider } from "~/views/components/data-table/providers/data-table-provider";
import { TableSetupForm } from "~/views/forms/table-setup-form/table-setup-form";

type tableSizeType = {
  rows: string;
  cols: string;
} | null;

const App = () => {
  const [tableSize, setTableSize] = useState<tableSizeType>(null);
  const handleSubmit = (rows: number, cols: number) => {
    setTableSize({ rows: rows.toString(), cols: cols.toString() });
  };

  return (
    <div>
      {!tableSize ? (
        <TableSetupForm onSubmit={handleSubmit} />
      ) : (
        <DataTableProvider
          rows={Number(tableSize.rows)}
          cols={Number(tableSize.cols)}
          setTableSize={setTableSize}
        >
          <DataTable />
        </DataTableProvider>
      )}
    </div>
  );
};

export default App;
