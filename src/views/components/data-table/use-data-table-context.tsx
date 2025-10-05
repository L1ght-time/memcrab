import { useContext } from "react";
import { DataTableContext } from "~/views/components/data-table/data-table-provider";

export const useDataTableContext = () => {
  const ctx = useContext(DataTableContext);
  if (!ctx)
    throw new Error(
      "useDataTableContext must be used inside DataTableProvider"
    );
  return ctx;
};
