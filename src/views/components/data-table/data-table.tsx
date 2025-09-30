import { useMemo } from "react";

import { MdDelete } from "react-icons/md";
import { getPercentileRow } from "~/utils/getPercentileRow";
import { Button } from "~/views/components/button/button";
import { DataTableCell } from "~/views/components/data-table/data-table-cell/data-table-cell";
import { useDataTableContext } from "~/views/components/data-table/hooks/use-data-table-context";
import { NavigationPanel } from "~/views/components/data-table/navigation-panel/navigation-panel";
import styles from "./data-table.module.scss";

export const DataTable = () => {
  const { matrix, setMatrix, cols } = useDataTableContext();
  const rowSums = useMemo(
    () => matrix.map((row) => row.reduce((sum, cell) => sum + cell.amount, 0)),
    [matrix]
  );

  const percentileRow = useMemo(
    () => getPercentileRow({ matrix, percentile: 60 }),
    [matrix]
  );

  const handleRemoveRow = (rowIndex: number) => {
    setMatrix((prev) => prev.filter((_, index) => index !== rowIndex));
  };

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
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <DataTableCell
                  key={cell.id}
                  cell={cell}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  setMatrix={setMatrix}
                >
                  {cell.amount}
                </DataTableCell>
              ))}
              <td className={styles.sum}>{rowSums[rowIndex]}</td>
              <td>
                <Button
                  variant="danger"
                  className={styles.removeRowBtn}
                  onClick={() => handleRemoveRow(rowIndex)}
                >
                  <MdDelete size={16} />
                  Delete
                </Button>
              </td>
            </tr>
          ))}
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
