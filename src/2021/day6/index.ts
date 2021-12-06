import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day6/data.txt");

export class LanternfishSpawner {
  private fishMap: Map<number, number> = new Map();
  private fishCounter = 0;

  constructor(input: string[]) {
    this.initializeMap(input[0].split(",").map(Number));
    this.fishCounter = input[0].split(",").length;
  }

  public run(days: number) {
    for (const day in Array.from({ length: days })) {
      this.runAnotherDay();
    }

    return this.fishCounter;
  }

  private initializeMap(numbers: number[]) {
    for (const num in Array.from({ length: 9 })) {
      const fishNum = Number(num);
      this.fishMap.set(fishNum, numbers.filter((n) => n === fishNum).length);
    }
  }

  private runAnotherDay() {
    const fishMapAfterToday = new Map<number, number>();

    for (const fishNum of [0, 1, 2, 3, 4, 5, 7]) {
      fishMapAfterToday.set(fishNum, this.fishMap.get(fishNum + 1) ?? 0);
    }

    const zeros = this.fishMap.get(0) ?? 0;
    fishMapAfterToday.set(6, zeros + (this.fishMap.get(7) ?? 0));
    fishMapAfterToday.set(8, zeros);

    this.fishCounter += this.fishMap.get(0) ?? 0;

    this.fishMap = fishMapAfterToday;
  }
}

export const main = () => {
  const result = new LanternfishSpawner(fileLines).run(256);
  return result;
};
