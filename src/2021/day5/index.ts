import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day5/data.txt");

type Position = [number, number];

type Instruction = {
  from: Position;
  to: Position;
};

export class HydroThermalVentureCalc {
  private instructions: Instruction[];
  private board = new Map<string, number>();

  constructor(input: string[]) {
    this.instructions = input.map(this.parseInstruction);
  }

  public run(): number {
    this.coverBoardWithLines(
      this.instructions.filter(this.isHorizontalOrVertical)
    );

    console.log(this.board);
    return 0;
  }

  private coverBoardWithLines(instructions: Instruction[]) {
    for (const instruction of instructions) {
      const fromX = instruction.from[0];
      const toX = instruction.to[0];

      const fromY = instruction.from[1];
      const toY = instruction.to[1];

      if (fromY === toY) {
        this.drawXline(fromX, toX, fromY);
      }
    }
  }

  private drawXline(from: number, to: number, y: number) {
    const lowerNumber = from < to ? from : to;
    const higherNumber = from > to ? from : to;

    for (let i = lowerNumber; i <= higherNumber; i++) {
      const mapKey = this.getMapKey(i, y);
      const exists = this.board.get(mapKey);
      if (exists) {
        this.board.set(mapKey, exists + 1);
      } else {
        this.board.set(mapKey, 1);
      }
    }
  }

  private getMapKey(x: number, y: number) {
    return `${x},${y}`;
  }

  private isHorizontalOrVertical(instruction: Instruction) {
    return (
      instruction.from[0] === instruction.to[0] ||
      instruction.from[1] === instruction.to[1]
    );
  }

  private parseInstruction(input: string): Instruction {
    const [rawFrom, rawTo] = input.split(" -> ");

    const from = rawFrom.split(",").map(Number) as [number, number];
    const to = rawTo.split(",").map(Number) as [number, number];

    return {
      from,
      to,
    };
  }
}

export const main = () => {
  const result = new HydroThermalVentureCalc(fileLines).run();
  return result;
};
