import { useState } from "react";
import { stepsOptions } from "~/constants";
import { DataTable } from "~/views/components/data-table/data-table";
import { DataTableProvider } from "~/views/components/data-table/data-table-provider";
import { TableSetupForm } from "~/views/forms/table-setup-form/table-setup-form";

type tableSizeType = {
  rows: string;
  cols: string;
} | null;

type Step = (typeof stepsOptions)[keyof typeof stepsOptions];

const App = () => {
  const [step, setStep] = useState<Step>(stepsOptions.setup);
  const [tableSize, setTableSize] = useState<tableSizeType>(null);
  const handleSubmit = (rows: number, cols: number) => {
    setTableSize({ rows: rows.toString(), cols: cols.toString() });
    setStep(stepsOptions.table);
  };

  const steps: Record<Step, React.ReactNode> = {
    setup: <TableSetupForm onSubmit={handleSubmit} />,
    table: tableSize && (
      <DataTableProvider
        rows={Number(tableSize.rows)}
        cols={Number(tableSize.cols)}
        setTableSize={setTableSize}
        setStep={setStep}
      >
        <DataTable />
      </DataTableProvider>
    ),
  };

  return steps[step];
};

export default App;
