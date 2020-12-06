import fs from "fs";
import path from "path";

const file = fs.readFileSync(path.resolve(__dirname, "./data.txt")).toString();
const fileLines = file.split("\n");

const parseSourceData = () => {
  let currentEntry = "";
  const lineEntries = fileLines.reduce<Set<string>[]>((acc, curr, i) => {
    const nextLine = fileLines[i + 1];
    const isLastLine = nextLine === "" || nextLine === undefined;

    currentEntry += curr;
    if (isLastLine) {
      const allLetters = currentEntry.trim().split("");
      const distinctLetters = new Set(allLetters);
      acc.push(distinctLetters);
      currentEntry = "";
    }

    return acc;
  }, []);

  return lineEntries;
};

export const main = (): number => {
  return parseSourceData().reduce((acc, curr) => {
    acc += curr.size;
    return acc;
  }, 0);
};
