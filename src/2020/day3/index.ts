import fs from "fs";
import path from "path";

const file = fs.readFileSync(path.resolve(__dirname, "./data.txt")).toString();
const fileLines = file.split("\r\n");

export const traverseMap = (right: number, down: number): number => {
  let totalTrees = 0;

  let currentPosition = right;
  for (let i = down; i < fileLines.length; i += down) {
    const letterPosition = currentPosition % fileLines[i].length;

    if (fileLines[i].charAt(letterPosition) === "#") {
      totalTrees++;
    }
    currentPosition += right;
  }

  return totalTrees;
};

export const main = (): number => {
  return (
    traverseMap(1, 1) *
    traverseMap(3, 1) *
    traverseMap(5, 1) *
    traverseMap(7, 1) *
    traverseMap(1, 2)
  );
};
