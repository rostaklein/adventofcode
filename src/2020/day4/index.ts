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

const hasAllValidFields = (
  partialEntry: PartialEntry
): partialEntry is Entry => {
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

const isNumberInRange = (value: number, range: [number, number]) => {
  const [min, max] = range;
  return value >= min && value <= max;
};

const isBirthYearValid = (entry: Entry) => {
  const year = Number(entry.byr);
  return year >= 1920 && year <= 2002;
};

const isIssueYearValid = (entry: Entry) => {
  const year = Number(entry.iyr);
  return year >= 2010 && year <= 2020;
};

const isExpirationYearValid = (entry: Entry) => {
  const year = Number(entry.eyr);
  return year >= 2020 && year <= 2030;
};

const isHeightValid = (entry: Entry) => {
  const height = entry.hgt.match(/(?<value>\d*)(?<unit>cm|in)/);
  const { value: rawValue, unit } = height?.groups ?? {};

  const value = Number(rawValue);
  if (!["cm", "in"].includes(unit)) {
    return false;
  }

  if (unit === "cm") {
    return value >= 150 && value <= 193;
  }
  if (unit === "in") {
    return value >= 59 && value <= 76;
  }
  return true;
};

const isHairColorValid = (entry: Entry) => {
  return entry.hcl.match(/#[0-9a-f]{6}/);
};

const isEyeColorValid = (entry: Entry) => {
  return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(entry.ecl);
};

const isPassportIdValid = (entry: Entry) => {
  return entry.pid.length === 9 && entry.pid.match(/\d{9}/);
};

export const main = (): number => {
  const entries = parseSourceData()
    .filter(hasAllValidFields)
    .filter(isBirthYearValid)
    .filter(isIssueYearValid)
    .filter(isExpirationYearValid)
    .filter(isHeightValid)
    .filter(isHairColorValid)
    .filter(isEyeColorValid)
    .filter(isPassportIdValid);

  return entries.length;
};
