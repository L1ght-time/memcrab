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
  highlightedIds: Set<number>;
  setHighlightedIds: React.Dispatch<React.SetStateAction<Set<number>>>;
  hoveredSumCell: number | null;
  setHoveredSumCell: React.Dispatch<React.SetStateAction<number | null>>;
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
  const [highlightedIds, setHighlightedIds] = useState<Set<number>>(new Set());
  const [hoveredSumCell, setHoveredSumCell] = useState<number | null>(null);

  useEffect(() => {
    if (matrix.length === 0) {
      setTableSize(null);
    }
  }, [matrix, setTableSize]);

  const value = useMemo(
    () => ({
      matrix,
      setMatrix,
      rows,
      cols,
      setTableSize,
      highlightedIds,
      setHighlightedIds,
      hoveredSumCell,
      setHoveredSumCell,
    }),
    [
      cols,
      matrix,
      rows,
      setMatrix,
      setTableSize,
      highlightedIds,
      setHighlightedIds,
      hoveredSumCell,
      setHoveredSumCell,
    ]
  );

  return (
    <DataTableContext.Provider value={value}>
      {children}
    </DataTableContext.Provider>
  );
};
