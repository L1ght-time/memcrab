import React, { useState } from "react";

import styles from "./table-setup-form.module.scss";

type TableSetupFormProps = {
  onSubmit: (rows: number, cols: number) => void;
};

type tableSizeType = {
  rows: string;
  cols: string;
};

const digitsOnlyRegexp = /^\d*$/;
const tableEntities = {
  rows: "rows",
  cols: "cols",
} as const;

export const TableSetupForm = (props: TableSetupFormProps) => {
  const { onSubmit } = props;

  const [tableSize, setTableSize] = useState<tableSizeType>({
    rows: "",
    cols: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (tableSize.rows && tableSize.cols) {
      onSubmit(Number(tableSize.rows), Number(tableSize.cols));
    }
  };

  const handleChange = (value: string, key: keyof typeof tableEntities) => {
    if (!digitsOnlyRegexp.test(value)) return;
    //TODO: We should use some lib like yup or zod for validation messages
    if (value === "0" || value.length > 3 || Number(value) > 100) return;
    setTableSize((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Set Table Size</h2>
        <label htmlFor="rows">Rows</label>
        <input
          id="rows"
          type="number"
          placeholder="Enter number from 1 to 100"
          value={tableSize.rows}
          onChange={(event) =>
            handleChange(event.target.value, tableEntities.rows)
          }
          min={0}
          max={100}
          required
        />
        <label htmlFor="cols">Columns</label>
        <input
          id="cols"
          type="number"
          placeholder="Enter number from 1 to 100"
          value={tableSize.cols}
          onChange={(event) =>
            handleChange(event.target.value, tableEntities.cols)
          }
          min={0}
          max={100}
          required
        />
        <button type="submit">Generate Table</button>
      </form>
    </div>
  );
};
