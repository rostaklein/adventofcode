import fs from "fs";
import path from "path";

export const readLinesFromAFile = (pathToResolve: string): string[] => {
  const file = fs
    .readFileSync(path.resolve(__dirname, pathToResolve))
    .toString();
  return file.split("\n");
};

export const clearTestInputData = (input: string): string[] =>
  input
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
