import clsx from "clsx";
import { IoIosAdd } from "react-icons/io";
import { generateMatrix } from "~/utils/generateMatrix";
import { Button } from "~/views/components/button/button";
import { useDataTableContext } from "~/views/components/data-table/hooks/use-data-table-context";
import styles from "./navigation-panel.module.scss";

export const NavigationPanel = () => {
  const { matrix, cols, setMatrix } = useDataTableContext();

  const handleAddRow = () => {
    setMatrix((prev) => {
      const newRowIndex = prev.length;

      const newRow = generateMatrix({ rows: 1, cols })[0].map(
        (cell, columnIndex) => ({
          ...cell,
          id: newRowIndex * cols + columnIndex + 1,
        })
      );
      return [...prev, newRow];
    });
  };

  const isDisabled = matrix.length >= 100;

  return (
    <div className={styles.navPanel}>
      <Button
        onClick={handleAddRow}
        disabled={isDisabled}
        Icon={() => <IoIosAdd size={24} />}
        className={clsx({ [styles.disabled]: isDisabled })}
      >
        Add Row
      </Button>
    </div>
  );
};
