import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day1/data.txt");

export const getTimesDepthIncreased = (input: string[]): number => {
  const depths = input.map(Number);

  let previousSum = 0;

  return depths.reduce((acc, curr, currIndex) => {
    const previousValue = depths[currIndex - 1] ?? null;
    const nextValue = depths[currIndex + 1] ?? null;

    if (previousValue === null || nextValue === null) {
      return acc;
    }

    const slidingWindowSum = previousValue + curr + nextValue;

    if (previousSum > 0 && slidingWindowSum > previousSum) {
      acc = acc + 1;
    }

    previousSum = slidingWindowSum;

    return acc;
  }, 0);
};

export const main = (): number => {
  return getTimesDepthIncreased(fileLines);
};
