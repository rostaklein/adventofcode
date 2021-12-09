import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day9/data.txt");

type Point = { num: number; x: number; y: number };

export class LowPointCalculator {
  private rows: number[][] = [];
  private lowPoints: Point[] = [];

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
    const basins: Point[][] = [];
    for (const lowPoint of this.lowPoints) {
      basins.push(this.checkIfAroundIsOneUp(lowPoint));
    }

    return basins
      .map((basin) => this.dedupe(basin).length)
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((acc, curr) => acc * curr, 1);
  }

  private checkIfAroundIsOneUp(point: Point) {
    let basin: Point[] = [];

    basin.push(point);
    const pointsAround = this.lookAround(point.x, point.y);
    for (const around of pointsAround) {
      if (around.num !== 9 && around.num > point.num) {
        const basinAround = this.checkIfAroundIsOneUp(around);
        basin = [...basin, ...basinAround];
      }
    }

    return basin;
  }

  private checkIfAlreadyExists(point: Point, basin: Point[]) {
    return basin.some(
      (basinPoint) => point.x === basinPoint.x && point.y === basinPoint.y
    );
  }

  private dedupe(basin: Point[]) {
    const deduped: Point[] = [];

    for (const point of basin) {
      if (!this.checkIfAlreadyExists(point, deduped)) {
        deduped.push(point);
      }
    }

    return deduped;
  }

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
  const result = calc.getBasins();
  console.timeEnd(LowPointCalculator.name);
  return result;
};
