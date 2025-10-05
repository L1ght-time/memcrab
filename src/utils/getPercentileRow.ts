import type { Matrix } from "~/types/client/entities";
import { getPercentileByColumn } from "~/utils/getPercentileByColumn";

type getPercentileRowProps = {
  matrix: Matrix;
  percentile: number;
};

export const getPercentileRow = (props: getPercentileRowProps): number[] => {
  const { matrix, percentile } = props;

  if (!matrix.length) return [];

  const cols = matrix[0].length;

  return Array.from({ length: cols }, (_, columnIndex) => {
    const colValues = matrix.map((row) => row[columnIndex].amount);
    return getPercentileByColumn({ arr: colValues, percentile });
  });
};
