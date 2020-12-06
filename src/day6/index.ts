import fs from "fs";
import path from "path";

const file = fs.readFileSync(path.resolve(__dirname, "./data.txt")).toString();
const fileLines = file.split("\n");

export const getCommonLetters = (groupEntry: string): string => {
  const entryPerPerson = groupEntry.split(" ");
  if (entryPerPerson.length === 1) {
    return groupEntry;
  }
  const groupedLetters = entryPerPerson.map((str) => str.split(""));
  const distinctLetters = new Set(groupedLetters.flat());

  let commonLetters = "";
  distinctLetters.forEach((letter) => {
    const includesLetter = groupedLetters.map((strs) => strs.includes(letter));
    if (includesLetter.every(Boolean)) {
      commonLetters += letter;
    }
  });

  return commonLetters;
};

const parseSourceData = () => {
  let currentEntry = "";
  const lineEntries = fileLines.reduce<string[]>((acc, curr, i) => {
    const nextLine = fileLines[i + 1];
    const isLastLine = nextLine === "" || nextLine === undefined;

    currentEntry += " " + curr;
    if (isLastLine) {
      const allLetters = currentEntry.trim();
      acc.push(allLetters);
      currentEntry = "";
    }

    return acc;
  }, []);

  return lineEntries;
};

export const main = (): number => {
  return parseSourceData()
    .map(getCommonLetters)
    .reduce((acc, curr) => {
      acc += curr.length;
      return acc;
    }, 0);
};
