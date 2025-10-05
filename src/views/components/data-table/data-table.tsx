import { useEffect, useMemo, useState } from "react";

import { MdDelete } from "react-icons/md";
import { stepsOptions } from "~/constants";
import type { Cell } from "~/types/client/entities";
import { getNearestCells } from "~/utils/getNearestCells";
import { getPercentileRow } from "~/utils/getPercentileRow";
import { Button } from "~/views/components/button/button";
import { DataTableCell } from "~/views/components/data-table/data-table-cell";
import { NavigationPanel } from "~/views/components/data-table/navigation-panel";
import { useDataTableContext } from "~/views/components/data-table/use-data-table-context";
import styles from "./data-table.module.scss";

//TODO: Actually if our table has a lot of data,
// we should handle it on the server side and to get data by parts or use virtualisation
// if we handle our table on the client side. For example TanStack Virtual suggest such solution for such case.
// We can load only part of data which user can see in the field of view.

const highlightLimit = 5;

export const DataTable = () => {
  const {
    matrix,
    setMatrix,
    cols,
    hoveredSumCell,
    setHoveredSumCell,
    setHighlightedIds,
    setStep,
  } = useDataTableContext();

  const [hoveredCell, setHoveredCell] = useState<Cell | null>(null);

  if (!matrix.length) {
    setStep(stepsOptions.setup);
  }

  const matrixData = useMemo(() => {
    return matrix.map((row) => {
      const sumCellsInRow = row.reduce((acc, cell) => acc + cell.amount, 0);
      const maxCellAmountInRow = Math.max(...row.map((cell) => cell.amount));
      return { row, sumCellsInRow, maxCellAmountInRow };
    });
  }, [matrix]);

  const percentileRow = useMemo(
    () => getPercentileRow({ matrix, percentile: 60 }),
    [matrix]
  );

  const handleRemoveRow = (rowIndex: number) => {
    setMatrix((prev) => prev.filter((_, index) => index !== rowIndex));
  };

  const flatCells = useMemo(() => matrix.flat(), [matrix]);

  useEffect(() => {
    if (!hoveredCell) {
      setHighlightedIds(new Set());
      return;
    }

    const nearestCells = getNearestCells({
      hoveredCell,
      flatCells,
      highlightLimit,
    });

    setHighlightedIds(new Set(nearestCells.map((cell) => cell.id)));
  }, [hoveredCell, setHighlightedIds, flatCells]);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {Array.from({ length: cols }, (_, i) => (
              <th key={i}>Col {i + 1}</th>
            ))}
            <th>Row Sum</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matrixData.map(
            ({ row, maxCellAmountInRow, sumCellsInRow }, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => {
                  const isSumHovered = hoveredSumCell === rowIndex;

                  const displayValue = isSumHovered
                    ? ((cell.amount / sumCellsInRow) * 100).toFixed(0) + "%"
                    : cell.amount;

                  const heatPercentage = isSumHovered
                    ? (cell.amount / maxCellAmountInRow) * 100
                    : 0;

                  const background = isSumHovered
                    ? `linear-gradient(to top, var(--color-heat) ${heatPercentage}%, transparent 0%)`
                    : undefined;

                  return (
                    <DataTableCell
                      key={cell.id}
                      cell={cell}
                      rowIndex={rowIndex}
                      onHoveredCell={setHoveredCell}
                      flatCells={flatCells}
                      colIndex={colIndex}
                      style={{
                        background: isSumHovered ? background : undefined,
                      }}
                    >
                      {displayValue}
                    </DataTableCell>
                  );
                })}
                <td
                  className={styles.sum}
                  onMouseEnter={() => setHoveredSumCell(rowIndex)}
                  onMouseLeave={() => setHoveredSumCell(null)}
                >
                  {sumCellsInRow}
                </td>
                <td>
                  <Button
                    variant="danger"
                    className={styles.removeRowBtn}
                    Icon={() => <MdDelete size={16} />}
                    onClick={() => handleRemoveRow(rowIndex)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
        <tfoot>
          <tr>
            {percentileRow.map((val, index) => (
              <td key={index} className={styles.percentile}>
                {val}
              </td>
            ))}
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <NavigationPanel />
    </div>
  );
};
