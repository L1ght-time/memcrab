import type { Matrix } from "~/types/client/entities";

type GetFractionalOfPercentileRankProps = {
  percentileRank: number;
};

const getFractionalOfPercentileRank = (
  props: GetFractionalOfPercentileRankProps
) => {
  const { percentileRank } = props;

  return +(percentileRank - Math.floor(percentileRank)).toFixed(1);
};

type GetPercentileRankProps = {
  percentile: number;
  totalValues: number;
};

const getPercentileRank = (props: GetPercentileRankProps) => {
  const { percentile, totalValues } = props;

  return (percentile / 100) * (totalValues - 1) + 1;
};

type getPercentileByColumn = {
  colValues: number[];
  percentile: number;
  columnLength: number;
};

const getPercentileByColumn = (props: getPercentileByColumn): number => {
  const { colValues, percentile, columnLength } = props;

  if (colValues.length === 1) {
    return colValues[0];
  }

  const sortedColsByCells = [...colValues].sort((a, b) => a - b);

  const percentileRank = getPercentileRank({
    percentile,
    totalValues: columnLength,
  });
  const fractionalPart = getFractionalOfPercentileRank({ percentileRank });

  const lowerIndex = Math.floor(percentileRank) - 1;
  const lowerValue = sortedColsByCells[lowerIndex];

  const higherIndex = lowerIndex + 1;
  const higherValue = sortedColsByCells[higherIndex];

  const percentileValue =
    lowerValue + fractionalPart * (higherValue - lowerValue);

  return percentileValue;
};

type getPercentileRowProps = {
  matrix: Matrix;
  percentile: number;
};

export const getPercentile = (props: getPercentileRowProps): number[] => {
  const { matrix, percentile } = props;

  if (!matrix.length) return [];
  const columnLength = matrix[0].length;

  return Array.from({ length: columnLength }, (_, columnIndex) => {
    const colValues = matrix.map((row) => row[columnIndex].amount);

    return getPercentileByColumn({
      colValues,
      percentile,
      columnLength,
    });
  });
};
