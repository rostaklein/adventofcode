import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day9/data.txt");

type Point = { num: number; x: number; y: number };

export class LowPointCalculator {
  private rows: number[][] = [];
  private lowPoints: Point[] = [];
  private basins: Point[][] = [];

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

  public getBasins() {
    for (const lowPoint of this.lowPoints) {
      const basin = [];
    }
  }

  // private checkIfAroundIsOneUp(x: number, y: number) {
  //   const pointsAround = this.lookAround(x, y);
  //   const oneUp = lowPoint.num + 1;
  //   for (const point of pointsAround) {
  //     if (point === oneUp) {
  //     }
  //   }
  // }

  private getNumberByXY(x: number, y: number): number | null {
    try {
      const num = this.rows[y][x];

      return num ?? null;
    } catch (err) {
      return null;
    }
  }

  private lookAround(x: number, y: number): Point[] {
    const left = this.getNumberByXY(x - 1, y);
    const right = this.getNumberByXY(x + 1, y);
    const up = this.getNumberByXY(x, y - 1);
    const down = this.getNumberByXY(x, y + 1);

    const around: Point[] = [];

    if (left !== null) {
      around.push({ num: left, x: x - 1, y });
    }
    if (right !== null) {
      around.push({ num: right, x: x + 1, y });
    }
    if (up !== null) {
      around.push({ num: up, x, y: y - 1 });
    }
    if (down !== null) {
      around.push({ num: down, x, y: y + 1 });
    }

    return around;
  }

  public getLowPoints() {
    let y = 0;
    for (const row of this.rows) {
      let x = 0;
      for (const num of row) {
        const pointsAround = this.lookAround(x, y);
        if (
          pointsAround.every(({ num: numAround }) => {
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
