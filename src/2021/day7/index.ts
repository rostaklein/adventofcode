import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day7/data.txt");

export class CrabFuelCalculator {
  private leastFuel: { position: number; fuel: number } = {
    position: Infinity,
    fuel: Infinity,
  };
  private originalPositions: number[];
  // private sortedUniquePositions: number[];
  private maxPosition: number;
  private minPosition: number;

  constructor(input: string[]) {
    this.originalPositions = input[0].split(",").map(Number);

    this.maxPosition = Math.max(...this.originalPositions);
    this.minPosition = Math.min(...this.originalPositions);
  }

  public run() {
    for (let toPos = this.minPosition; toPos <= this.maxPosition; toPos++) {
      let fuel = 0;
      for (const fromPos of this.originalPositions) {
        fuel += CrabFuelCalculator.stepFuelCalculator(fromPos, toPos);
      }
      if (fuel < this.leastFuel.fuel) {
        this.leastFuel = {
          position: toPos,
          fuel,
        };
      }
      console.log({ toPos });
    }
    return this.leastFuel.fuel;
  }

  public static stepFuelCalculator(from: number, to: number) {
    if (from === to) {
      return 0;
    }
    const diff = Math.abs(to - from);
    const cost = (diff * (diff + 1)) / 2;

    return cost;
  }
}

export const main = () => {
  const result = new CrabFuelCalculator(fileLines).run();
  return result;
};
