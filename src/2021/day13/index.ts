import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day13/data.txt");

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

    console.log({ maxX, maxY });

    this.dots = dots;
    this.gridSize = [maxX + 1, maxY + 1];

    this.foldInstructions = input
      .filter((line) => line.includes("="))
      .map((line) => line.split("="))
      .map(([left, right]) => {
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

    console.log({ firstInstruction });
    if (firstInstruction.axis === "x") {
      return this.foldByX(firstInstruction.index);
    } else {
      return this.foldByY(firstInstruction.index);
    }
  }

  public getNumberOfVisibleDots() {
    return this.dotsOnPaper.reduce((acc, curr) => {
      const dots = curr.filter((char) => char === "#");

      return (acc = acc + dots.length);
    }, 0);
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

    this.dotsOnPaper = merged;

    return merged.map((line) => line.join("")).join("\n");
  }

  private foldByX(index: number) {
    const merged: string[][] = [];
    for (const line of this.dotsOnPaper) {
      const leftSide = [...line].splice(0, index);
      const rightSide = [...line].splice(index + 1);

      leftSide.reverse();

      const together = this.mergeLines(leftSide, rightSide);

      together.reverse();

      merged.push(together);
    }

    this.dotsOnPaper = merged;

    return merged;
  }

  private mergeLines(first: string[], second: string[]) {
    return first.map((val, i) => (second[i] === "#" ? "#" : val));
  }
}

export const main = () => {
  console.time(TransparentOrigami.name);
  const calc = new TransparentOrigami(fileLines);
  calc.getDotsOnPaper();
  calc.foldByFirstInstruction();
  const result = calc.getNumberOfVisibleDots();
  console.timeEnd(TransparentOrigami.name);
  return result;
};
