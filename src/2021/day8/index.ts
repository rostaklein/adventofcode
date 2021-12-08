import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day8/data.txt");

export class SevenSegmentSearch {
  private lengthsToPick = [2, 4, 3, 7];
  private outputValues: string[][];
  constructor(input: string[]) {
    this.outputValues = input.map((item) => {
      const [, output] = item.split(" | ");

      return output.split(" ");
    });
  }

  public run() {
    let count = 0;

    for (const output of this.outputValues) {
      const hasSome = output.filter((item) =>
        this.lengthsToPick.includes(item.length)
      );

      count += hasSome.length;
      // console.log({ hasSome });
    }

    return count;
  }
}

export const main = () => {
  const result = new SevenSegmentSearch(fileLines).run();
  return result;
};
