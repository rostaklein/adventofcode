import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day3/data.txt");

const binaryToDecimal = (num: string | number) => parseInt(`${num}`, 2);

export class LifeSupportRatingCalculator {
  constructor(private readonly rawInput: string[]) {}

  public run(): number {
    return (this.getOxygenRating() ?? 0) * (this.getCo2Rating() ?? 0);
  }

  private getOxygenRating() {
    const rowLength = this.rawInput[0].length;

    let filteredRows = this.rawInput;

    for (const column in Array.from({ length: rowLength })) {
      const mostCommonInColumn = this.getMostCommonInColumn(
        filteredRows,
        Number(column)
      );
      filteredRows = this.getRowsWithCharAtPosition(
        filteredRows,
        mostCommonInColumn,
        Number(column)
      );

      if (filteredRows.length === 1) {
        return binaryToDecimal(filteredRows[0]);
      }
    }
  }

  private getCo2Rating() {
    const rowLength = this.rawInput[0].length;

    let filteredRows = this.rawInput;

    for (const column in Array.from({ length: rowLength })) {
      const mostCommonInColumn = this.getLeastCommonInColumn(
        filteredRows,
        Number(column)
      );
      filteredRows = this.getRowsWithCharAtPosition(
        filteredRows,
        mostCommonInColumn,
        Number(column)
      );

      if (filteredRows.length === 1) {
        return binaryToDecimal(filteredRows[0]);
      }
    }
  }

  private getMostCommonInColumn(rows: string[], column: number) {
    let [zero, one] = [0, 0];

    for (const row of rows) {
      if (row[column] === "1") {
        one++;
      } else {
        zero++;
      }
    }

    return one >= zero ? "1" : "0";
  }

  private getLeastCommonInColumn(rows: string[], column: number) {
    let [zero, one] = [0, 0];

    for (const row of rows) {
      if (row[column] === "1") {
        one++;
      } else {
        zero++;
      }
    }

    return one < zero ? "1" : "0";
  }

  private getRowsWithCharAtPosition(
    rows: string[],
    char: "0" | "1",
    position: number
  ) {
    return rows.filter((row) => row.charAt(position) === char);
  }
}

export const main = () => {
  const result = new LifeSupportRatingCalculator(fileLines).run();
  return result;
};
