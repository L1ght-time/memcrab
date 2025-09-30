import clsx from "clsx";
import { useMemo } from "react";
import type { Cell } from "~/utils/generateMatrix";
import { useDataTableContext } from "~/views/components/data-table/hooks/use-data-table-context";
import styles from "./data-table-cell.module.scss";

type DataTableCellProps = React.JSX.IntrinsicElements["td"] & {
  cell: { id: number; amount: number };
  rowIndex: number;
  colIndex: number;
};

const highlightLimit = 5;

export const DataTableCell = (props: DataTableCellProps) => {
  const { cell, rowIndex, colIndex, children, className, ...rest } = props;

  const { matrix, setMatrix, highlightedIds, setHighlightedIds } =
    useDataTableContext();

  const handleIncreaseValue = () => {
    setMatrix((prev) =>
      prev.map((row, index) =>
        index === rowIndex
          ? row.map((cell, index) =>
              index === colIndex ? { ...cell, amount: cell.amount + 1 } : cell
            )
          : row
      )
    );
  };

  const flatCells = useMemo(() => matrix.flat(), [matrix]);

  const handleMouseEnter = (hoveredCell: Cell) => {
    const nearestCells = flatCells
      .filter((cell) => cell.id !== hoveredCell.id)
      .map((cell) => ({
        id: cell.id,
        diff: Math.abs(cell.amount - hoveredCell.amount),
      }))
      .sort((a, b) => a.diff - b.diff)
      .slice(0, highlightLimit);

    setHighlightedIds(new Set(nearestCells.map((cell) => cell.id)));
  };

  const handleMouseLeave = () => {
    setHighlightedIds(new Set());
  };

  return (
    <td
      onClick={handleIncreaseValue}
      onMouseEnter={() => handleMouseEnter(cell)}
      onMouseLeave={handleMouseLeave}
      className={clsx(
        styles.cell,
        {
          [styles.highlighted]: !!highlightedIds.has(cell.id),
        },
        className
      )}
      {...rest}
    >
      {children}
    </td>
  );
};
