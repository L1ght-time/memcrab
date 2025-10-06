import clsx from "clsx";
import type { Cell } from "~/types/client/entities";
import { useDataTableContext } from "~/views/components/data-table/use-data-table-context";
import styles from "./data-table.module.scss";

type DataTableCellProps = React.JSX.IntrinsicElements["td"] & {
  cell: Cell;
  rowIndex: number;
  colIndex: number;
  onHoveredCell: (cell: Cell | null) => void;
};

export const DataTableCell = (props: DataTableCellProps) => {
  const {
    cell,
    rowIndex,
    colIndex,
    children,
    className,
    onHoveredCell,
    ...rest
  } = props;

  const { setMatrix, highlightedIds, setHighlightedIds } =
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

  const handleMouseLeave = () => {
    setHighlightedIds(new Set());
    onHoveredCell(null);
  };

  return (
    <td
      onClick={handleIncreaseValue}
      onMouseEnter={() => onHoveredCell(cell)}
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
