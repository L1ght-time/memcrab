import type { Cell } from "~/utils/generateMatrix";

type GetNearestCellsProps = {
  hoveredCell: Cell;
  flatCells: Cell[];
  highlightLimit: number;
};

export const getNearestCells = (props: GetNearestCellsProps) => {
  const { hoveredCell, flatCells, highlightLimit } = props;

  return flatCells
    .filter((cell) => cell.id !== hoveredCell.id)
    .map((cell) => ({
      id: cell.id,
      diff: Math.abs(cell.amount - hoveredCell.amount),
    }))
    .sort((a, b) => a.diff - b.diff)
    .slice(0, highlightLimit);
};
