import fs from "fs";
import path from "path";

const file = fs.readFileSync(path.resolve(__dirname, "./data.txt")).toString();
const fileLines = file.split("\n");

const getIsValidGroup = (params: {
  from: number;
  to: number;
  letter?: string;
  password?: string;
}) => {
  const matches = params.password?.match(new RegExp(`${params.letter}`, "gi"));
  const matchesTimes = matches?.length ?? 0;
  if (matchesTimes >= params.from && matchesTimes <= params.to) {
    return true;
  }
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
      letter: item?.letter,
      password: item?.password,
    }));

  const validGroups = groups.filter(getIsValidGroup);

  return validGroups;
};

export const main = (): number => {
  const pwds = getValidPasswords();
  return pwds.length;
};
