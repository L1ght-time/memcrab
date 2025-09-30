export type Cell = { id: number; amount: number };

type GenerateMatrixProps = {
  rows: number;
  cols: number;
};

export const generateMatrix = (props: GenerateMatrixProps): Cell[][] => {
  const { rows, cols } = props;

  const matrix = new Array(rows);

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row = new Array<Cell>(cols);

    for (let colIndex = 0; colIndex < cols; colIndex++) {
      const id = rowIndex * cols + colIndex + 1;
      const amount = Math.floor(Math.random() * 900) + 100;
      row[colIndex] = { id, amount };
    }
    matrix[rowIndex] = row;
  }
  return matrix;
};
