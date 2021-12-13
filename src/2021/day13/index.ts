import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day12/data.txt");

export class TransparentOrigami {
  private gridSize: [number, number] = [0, 0];
  private dots: {
    x: number;
    y: number;
  }[] = [];
  private dotsOnPaper: string[][] = [];

  constructor(private input: string[]) {
    const dots = input
      .filter((line) => line.includes(","))
      .map((line) => {
        const [x, y] = line.split(",");
        return { x: Number(x), y: Number(y) };
      });

    const maxX = Math.max(...dots.map(({ x }) => x));
    const maxY = Math.max(...dots.map(({ y }) => y));

    console.log(dots, { maxX, maxY });

    this.dots = dots;
    this.gridSize = [maxX + 1, maxY + 1];
  }

  public getDotsOnPaper() {
    for (let y = 0; y < this.gridSize[1]; y++) {
      if (!this.dotsOnPaper[y]) {
        this.dotsOnPaper[y] = [];
      }
      for (let x = 0; x < this.gridSize[0]; x++) {
        const hasDot = this.dots.some(
          (dotPos) => dotPos.x === x && dotPos.y === y
        );

        if (hasDot) {
          this.dotsOnPaper[y].push("#");
        } else {
          this.dotsOnPaper[y].push(".");
        }
      }
    }
    return this.dotsOnPaper.map((row) => row.join("")).join("\n");
  }
}

export const main = () => {
  console.time(TransparentOrigami.name);
  const calc = new TransparentOrigami(fileLines);
  const result = calc.getDotsOnPaper();
  console.timeEnd(TransparentOrigami.name);
  return result;
};
