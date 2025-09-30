type getPercentileByColumn = {
  arr: number[];
  percentile: number;
};

export const getPercentileByColumn = (props: getPercentileByColumn): number => {
  const { arr, percentile } = props;

  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const index = Math.floor((percentile / 100) * sorted.length);
  return sorted[index] ?? sorted[sorted.length - 1];
};
