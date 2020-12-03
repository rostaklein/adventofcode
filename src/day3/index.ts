import fs from "fs";
import path from "path";

const file = fs.readFileSync(path.resolve(__dirname, "./data.txt")).toString();
const fileLines = file.split("\r\n");

export const main = (): number => {
  let totalTrees = 0;

  fileLines.shift();

  let currentIndex = 1;
  for (const line of fileLines) {
    const letterPosition = (3 * currentIndex) % line.length;

    if (line.charAt(letterPosition) === "#") {
      totalTrees++;
    }
    currentIndex++;
  }

  return totalTrees;
};
