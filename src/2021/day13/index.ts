import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day12/data.txt");

export class TransparentOrigami {
  private gridSize: [number, number] = [0, 0];
  private dots: {
    x: number;
    y: number;
  }[] = [];
  private dotsOnPaper: string[][] = [];
  private foldInstructions: { axis: "x" | "y"; index: number }[] = [];

  constructor(private input: string[]) {
    const dots = input
      .filter((line) => line.includes(","))
      .map((line) => {
        const [x, y] = line.split(",");
        return { x: Number(x), y: Number(y) };
      });

    const maxX = Math.max(...dots.map(({ x }) => x));
    const maxY = Math.max(...dots.map(({ y }) => y));

    this.dots = dots;
    this.gridSize = [maxX + 1, maxY + 1];

    this.foldInstructions = input
      .filter((line) => line.includes("="))
      .map((line) => line.split("="))
      .map(([left, right]) => {
        console.log(left, right);
        return {
          axis: left.substring(left.length - 1) as "x" | "y",
          index: Number(right),
        };
      });
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

  public foldByFirstInstruction() {
    const firstInstruction = this.foldInstructions[0];

    if (firstInstruction.axis === "y") {
      return this.foldByY(firstInstruction.index);
    }
  }

  private foldByY(index: number) {
    const firstHalf = [...this.dotsOnPaper].splice(0, index);
    const secondHalf = [...this.dotsOnPaper].splice(index + 1);

    const merged = [];

    let i = 0;
    for (const firstHalfLine of [...firstHalf.reverse()]) {
      const secondHalfLine = secondHalf[i];
      merged.push(this.mergeLines(firstHalfLine, secondHalfLine));
      i++;
    }

    merged.reverse();

    return merged.map((line) => line.join("")).join("\n");
  }

  private mergeLines(first: string[], second: string[]) {
    return first.map((val, i) => (second[i] === "#" ? "#" : val));
  }
}

export const main = () => {
  console.time(TransparentOrigami.name);
  const calc = new TransparentOrigami(fileLines);
  const result = calc.getDotsOnPaper();
  console.timeEnd(TransparentOrigami.name);
  return result;
};
