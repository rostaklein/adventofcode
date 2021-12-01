import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day1/data.txt");

export const getTimesDepthIncreased = (input: string[]): number => {
  const depths = input.map(Number);

  return depths.reduce((acc, curr, currIndex) => {
    const previousValue = depths[currIndex - 1] ?? null;

    if (previousValue === null) {
      return acc;
    }

    if (previousValue < curr) {
      return acc + 1;
    }

    return acc;
  }, 0);
};

export const main = (): number => {
  return getTimesDepthIncreased(fileLines);
};
