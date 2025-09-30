import type { Cell } from "~/utils/generateMatrix";

type DataTableCellProps = React.JSX.IntrinsicElements["td"] & {
  cell: { id: number; amount: number };
  rowIndex: number;
  colIndex: number;
  setMatrix: React.Dispatch<React.SetStateAction<Cell[][]>>;
};

export const DataTableCell = (props: DataTableCellProps) => {
  const { rowIndex, colIndex, children, setMatrix, ...rest } = props;

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

  return (
    <td onClick={handleIncreaseValue} style={{ cursor: "pointer" }} {...rest}>
      {children}
    </td>
  );
};
