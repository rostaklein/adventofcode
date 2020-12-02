import fs from "fs";
import path from "path";

const file = fs
  .readFileSync(path.resolve(__dirname, "./data/day1.txt"))
  .toString();
const numbers = file.split("\n").map((str) => Number(str));

export const getNumbersThatSumTo = (sum: number): [number, number] => {
  for (const first of numbers) {
    for (const second of numbers) {
      if (first + second === sum) {
        return [first, second];
      }
    }
  }
  throw new Error(`Numbers that sum to ${sum} were not found.`);
};

export const main = (): number => {
  const [first, second] = getNumbersThatSumTo(2020);
  return first * second;
};
