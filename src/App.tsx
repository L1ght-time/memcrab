/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { DataTableWithProvider } from "~/views/components/data-table/data-table-with-provider";
import { TableSetupForm } from "~/views/forms/table-setup-form/table-setup-form";

type tableSizeType = {
  rows: string;
  cols: string;
} | null;

export const stepsOptions = {
  setup: "setup",
  table: "table",
} as const;

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
      <DataTableWithProvider
        rows={Number(tableSize.rows)}
        cols={Number(tableSize.cols)}
        setTableSize={setTableSize}
        setStep={setStep}
      />
    ),
  };

  return steps[step];
};

export default App;
