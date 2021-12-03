import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day3/data.txt");

const binaryToDecimal = (num: string | number) => parseInt(`${num}`, 2);

const getMostCommonInColumn = (input: string[], column: number) => {
  let [zero, one] = [0, 0];

  for (const row of input) {
    if (row[column] === "1") {
      one++;
    } else {
      zero++;
    }
  }

  return zero > one ? "0" : "1";
};

const replaceChars = { "1": "0", "0": "1" } as Record<string, string>;

export const calcPowerConsumption = (input: string[]) => {
  const rowLength = input[0].length;

  let gammaRate = "";

  for (const column in Array.from({ length: rowLength })) {
    const mostCommonInColumn = getMostCommonInColumn(input, Number(column));
    gammaRate += mostCommonInColumn;
  }

  const epsilonRate = gammaRate.replace(/1|0/g, (match) => replaceChars[match]);

  return binaryToDecimal(gammaRate) * binaryToDecimal(epsilonRate);
};

export const main = () => {
  const result = calcPowerConsumption(fileLines);
  return result;
};
