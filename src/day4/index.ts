import fs from "fs";
import path from "path";

const file = fs.readFileSync(path.resolve(__dirname, "./data.txt")).toString();
const fileLines = file.split("\n");

type Entry = {
  byr: string;
  iyr: string;
  eyr: string;
  hgt: string;
  hcl: string;
  ecl: string;
  pid: string;
  cid?: string;
};

type PartialEntry = Partial<Entry>;

const parseSourceData = () => {
  let currentEntry = "";
  const lineEntries = fileLines.reduce<string[]>((acc, curr, i) => {
    const nextLine = fileLines[i + 1];
    const isLastLine = nextLine === "" || nextLine === undefined;

    currentEntry += " " + curr;
    if (isLastLine) {
      acc.push(currentEntry.trim());
      currentEntry = "";
    }

    return acc;
  }, []);

  const entries = lineEntries.map((entry) => {
    const splitted = entry.split(" ").reduce((acc, str) => {
      const [key, value] = str.trim().split(":") as [keyof Entry, string];
      acc[key] = value;
      return acc;
    }, {} as PartialEntry);
    return splitted;
  }, {});

  return entries;
};

const isValidEntry = (partialEntry: PartialEntry): partialEntry is Entry => {
  if (
    partialEntry.byr &&
    partialEntry.ecl &&
    partialEntry.eyr &&
    partialEntry.hcl &&
    partialEntry.hgt &&
    partialEntry.iyr &&
    partialEntry.pid
  ) {
    return true;
  }
  return false;
};

export const main = (): number => {
  const entries = parseSourceData().filter(isValidEntry);
  //   console.log(fileLines);

  return entries.length;
};
