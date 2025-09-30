/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useMemo, useState } from "react";
import { generateMatrix, type Cell } from "~/utils/generateMatrix";

type DataTableProviderProps = {
  rows: number;
  cols: number;
  setTableSize: React.Dispatch<
    React.SetStateAction<{ rows: string; cols: string } | null>
  >;
};

type TableContextType = DataTableProviderProps & {
  matrix: Cell[][];
  setMatrix: React.Dispatch<React.SetStateAction<Cell[][]>>;
};

export const DataTableContext = createContext<TableContextType | undefined>(
  undefined
);

export const DataTableProvider: React.FC<
  React.PropsWithChildren<DataTableProviderProps>
> = ({ rows, cols, children, setTableSize }) => {
  const [matrix, setMatrix] = useState<Cell[][]>(() =>
    generateMatrix({ rows, cols })
  );

  useEffect(() => {
    if (matrix.length === 0) {
      setTableSize(null);
    }
  }, [matrix, setTableSize]);

  const value = useMemo(
    () => ({ matrix, setMatrix, rows, cols, setTableSize }),
    [cols, matrix, rows, setMatrix, setTableSize]
  );

  return (
    <DataTableContext.Provider value={value}>
      {children}
    </DataTableContext.Provider>
  );
};
