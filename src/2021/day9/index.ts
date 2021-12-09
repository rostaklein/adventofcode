import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day9/data.txt");

export class LowPointCalculator {
  private rows: number[][] = [];
  private lowPoints: { num: number; x: number; y: number }[] = [];
  private basins = new Map<number, number[]>();

  constructor(input: string[]) {
    let i = 0;
    for (const rawInputRow of input) {
      this.rows[i] = rawInputRow.split("").map(Number);
      i++;
    }
  }

  public getSum() {
    return this.lowPoints.reduce((acc, curr) => (acc += curr.num + 1), 0);
  }

  private getNumberByXY(x: number, y: number): number | null {
    try {
      const num = this.rows[y][x];

      return num ?? null;
    } catch (err) {
      return null;
    }
  }

  private lookAround(x: number, y: number) {
    const left = this.getNumberByXY(x - 1, y);
    const right = this.getNumberByXY(x + 1, y);
    const up = this.getNumberByXY(x, y - 1);
    const down = this.getNumberByXY(x, y + 1);

    return [left, right, up, down];
  }

  public getLowPoints() {
    let y = 0;
    for (const row of this.rows) {
      let x = 0;
      for (const num of row) {
        const [left, right, up, down] = this.lookAround(x, y);
        if (
          [left, right, up, down].every((numAround) => {
            if (numAround === null) {
              return true;
            }
            return numAround > num;
          })
        ) {
          this.lowPoints.push({
            num,
            x,
            y,
          });
        }
        // console.log({ numLeft, numRight, numUp, numDown, num });
        x++;
      }
      y++;
    }
    return this.lowPoints.map(({ num }) => num);
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
