import fs from "fs";
import path from "path";

const file = fs.readFileSync(path.resolve(__dirname, "./data.txt")).toString();
const fileLines = file.split("\n");

const getIsValidGroup = (params: {
  from: number;
  to: number;
  letter: string;
  password: string;
}) => {
  const charAtFrom = params.password.charAt(params.from - 1);
  const charAtTo = params.password.charAt(params.to - 1);

  const firstMatches = charAtFrom === params.letter;
  const secondMatches = charAtTo === params.letter;
  return {
    ...params,
    firstMatches,
    secondMatches,
  };
};

export const getValidPasswords = () => {
  const parsed = fileLines.map((line) =>
    line.match(/(?<from>\d*)-(?<to>\d*) (?<letter>.): (?<password>.*)/)
  );
  const groups = parsed
    .map((item) => item?.groups)
    .map((item) => ({
      from: Number(item?.from),
      to: Number(item?.to),
      letter: item?.letter ?? "",
      password: item?.password ?? "",
    }));

  const validGroups = groups
    .map(getIsValidGroup)
    .filter(({ firstMatches, secondMatches }) => {
      return firstMatches !== secondMatches;
    });

  return validGroups;
};

export const main = (): number => {
  const pwds = getValidPasswords();
  return pwds.length;
};
