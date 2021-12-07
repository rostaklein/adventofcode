import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day7/data.txt");

export class CrabFuelCalculator {
  private leastFuel: { position: number; fuel: number } = {
    position: Infinity,
    fuel: Infinity,
  };
  private originalPositions: number[];
  private sortedUniquePositions: number[];

  constructor(input: string[]) {
    this.originalPositions = input[0].split(",").map(Number);

    this.sortedUniquePositions = [
      ...new Set(this.originalPositions.sort((a, b) => a - b)),
    ];
    // console.log(this.originalPositions);
    // console.log(sortedPositions);
  }

  public run() {
    for (const toPos of this.sortedUniquePositions) {
      let fuel = 0;
      for (const fromPos of this.originalPositions) {
        fuel += Math.abs(toPos - fromPos);
      }
      if (fuel < this.leastFuel.fuel) {
        this.leastFuel = {
          position: toPos,
          fuel,
        };
      }
      // console.log({ toPos, fuel }, this.leastFuel);
    }
    return this.leastFuel.fuel;
  }
}

export const main = () => {
  const result = new CrabFuelCalculator(fileLines).run();
  return result;
};
