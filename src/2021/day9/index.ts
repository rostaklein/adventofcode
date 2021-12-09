import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day9/data.txt");

export class LowPointCalculator {
  private rows: number[][] = [];
  private lowPoints: number[] = [];
  constructor(input: string[]) {
    let i = 0;
    for (const rawInputRow of input) {
      this.rows[i] = rawInputRow.split("").map(Number);
      i++;
    }
  }

  public getSum() {
    return this.lowPoints.reduce((acc, curr) => (acc += curr + 1), 0);
  }

  private getNumberByXY(x: number, y: number): number | null {
    try {
      const num = this.rows[y][x];

      return num ?? null;
    } catch (err) {
      return null;
    }
  }

  public getLowPoints() {
    let y = 0;
    for (const row of this.rows) {
      let x = 0;
      for (const num of row) {
        const numLeft = this.getNumberByXY(x - 1, y);
        const numRight = this.getNumberByXY(x + 1, y);
        const numUp = this.getNumberByXY(x, y - 1);
        const numDown = this.getNumberByXY(x, y + 1);

        if (
          [numLeft, numRight, numDown, numUp].every((numAround) => {
            if (numAround === null) {
              return true;
            }
            return numAround > num;
          })
        ) {
          this.lowPoints.push(num);
        }
        // console.log({ numLeft, numRight, numUp, numDown, num });
        x++;
      }
      y++;
    }
    return this.lowPoints;
  }
}

export const main = () => {
  console.time(LowPointCalculator.name);
  const calc = new LowPointCalculator(fileLines);
  calc.getLowPoints();
  const result = calc.getSum();
  console.timeEnd(LowPointCalculator.name);
  return result;
};
